import app from "../app";
import request from "supertest";
import { Questions } from "../interfaces/form";

const likert: any[] = [];

/*
Possível escala de teste: [{"id":1,"value":1},{"id":2,"value":5},{"id":3,"value":4},{"id":4,"value":2},{"id":5,"value":3},{"id":6,"value":2},{"id":7,"value":2},{"id":8,"value":2},{"id":9,"value":3},{"id":10,"value":3},{"id":11,"value":1},{"id":12,"value":5},{"id":13,"value":1},{"id":14,"value":1},{"id":15,"value":2},{"id":16,"value":2},{"id":17,"value":3},{"id":18,"value":2},{"id":19,"value":2},{"id":20,"value":5},{"id":21,"value":3},{"id":22,"value":4},{"id":23,"value":5},{"id":24,"value":1},{"id":25,"value":1},{"id":26,"value":4},{"id":27,"value":3},{"id":28,"value":3},{"id":29,"value":2},{"id":30,"value":1},{"id":31,"value":2},{"id":32,"value":3},{"id":33,"value":3},{"id":34,"value":1},{"id":35,"value":2},{"id":36,"value":1},{"id":37,"value":4},{"id":38,"value":1},{"id":39,"value":2},{"id":40,"value":4},{"id":41,"value":5},{"id":42,"value":3},{"id":43,"value":3},{"id":44,"value":5},{"id":45,"value":4},{"id":46,"value":1},{"id":47,"value":5},{"id":48,"value":3},{"id":49,"value":5},{"id":50,"value":2}]
*/

describe("Sistema de gestão de formulário likert para Big-5", () => {
    beforeAll(async() => {
        // Cria a escala padrão utilizada no teste
        for(let i = 1; i <= 50; i++) {
            likert.push({ id: i, value: Math.floor(Math.random() * 5) + 1 })
        }
    });

    afterAll(async() => {});

    describe("GET /form - Recuperação de questões para composição da escala Big-5", () => {
        it("Recupera todas as questões para teste", async() => {
            const result = await request(app).get("/form");
            expect(result.body).toMatchObject({
                statusCode: expect.any(Number),
                message: expect.any(String),
                data: { questions: expect.any(Array<Questions>) }
            });
            expect(result.body.statusCode).toBe(200);
            expect(result.body.data.questions.length).toBe(50);
        });
    });

    describe("POST /result - Faz o cálculo do Big-5 para um questionário respondido", () => {
        it("Falha - corpo da requisição com elementos errados", async() => {
            const result = await request(app).post("/form");
            expect(result.body).toEqual(expect.objectContaining({ statusCode: 400 }));
        });

        it("Falha - array de respostas com atributos faltantes", async() => {
            // Invalida o atributo id
            let data = [];
            for(let i = 0; i < likert.length; i++) {
                if(i == 40) data.push({ value: likert[i].value });
                else data.push({...likert[i]})
            }
            let result = await request(app).post("/form").send({ questions: data });
            expect(result.body).toEqual(expect.objectContaining({
                statusCode: 400,
                message: `\"questions[40].id\" is required`
            }));

            // Invalida o atributo value
            data = [];
            for(let i = 0; i < likert.length; i++) {
                if(i == 40) data.push({ id: likert[i].id });
                else data.push({...likert[i]})
            }
            result = await request(app).post("/form").send({ questions: data });
            expect(result.body).toEqual(expect.objectContaining({
                statusCode: 400,
                message: `\"questions[40].value\" is required`
            }));
        });

        it("Falha - array de respostas com número de questões diferente de 50", async() => {
            const data = likert.slice(0, 49);
            const result = await request(app).post("/form").send({ questions: data });
            expect(result.body).toEqual(expect.objectContaining({
                statusCode: 444,
                message: "O teste precisa de ao menos 50 questões respondidas"
            }));
        });

        it("Falha - envio de questões não existentes no banco de dados", async() => {
            //const data = [...likert];
            //data[0].id = 100;
            const data: any[] = [];
            likert.forEach((item, i) => {
                if(i == 40) data.push({ id: 100, value: item.value });
                else data.push(item)
            });
            const result = await request(app).post("/form").send({ questions: data });
            expect(result.body).toEqual(expect.objectContaining({
                statusCode: 444,
                message: "Foram informadas questões não existentes no banco de dados"
            }));
        });

        it("Sucesso - cálculo big-5 efetuado e resposta enviada para o usuário", async() => {
            const result = await request(app).post("/form").send({ questions: likert });
            expect(result.body.message).toBe("");
            expect(result.body.statusCode).toBe(200);
            expect(result.body.data.result.length).toBe(5);
        });

        /*

        

        it("Sucesso - cálculo big-5 efetuado e registro salvo no banco");

        it("Sucesso - cálculo big-5 efetuado e resposta enviada para o usuário");*/
    });
});
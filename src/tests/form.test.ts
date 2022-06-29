import app from "../app";
import request from "supertest";
import { Questions } from "../interfaces/form";

const likert: any[] = [];

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
            expect(result.body).toEqual(expect.objectContaining({ statusCode: 400 }));

            // Invalida o atributo value
            data = [];
            for(let i = 0; i < likert.length; i++) {
                if(i == 40) data.push({ id: likert[i].id });
                else data.push({...likert[i]})
            }
            result = await request(app).post("/form").send({ questions: data });
            expect(result.body).toEqual(expect.objectContaining({ statusCode: 400 }));
        });

        it("Falha - array de respostas com número de questões diferente de 50", async() => {
            const data = likert.slice(0, 49);
            const result = await request(app).post("/form").send({ questions: data });
            expect(result.body).toEqual(expect.objectContaining({ statusCode: 444 }));
        });

        /*

        it("Falha - envio de questões não existentes no banco de dados");

        it("Sucesso - cálculo big-5 efetuado e registro salvo no banco");

        it("Sucesso - cálculo big-5 efetuado e resposta enviada para o usuário");*/
    });
});
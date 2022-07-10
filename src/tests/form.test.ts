import XLSX from "xlsx";
import path from "path";
import app from "../app";
import request from "supertest";
import { Log } from "../entity/Log";
import AppDataSource from "../data-source";
import { Questions } from "../interfaces/form";

let idTemp: number;
const duration = 100;
let likert: any[] = [];
const ip = "189.26.103.5";

describe("Sistema de gestão de formulário likert para Big-5", () => {
    beforeAll(async() => {
        // Faz a leitura do arquivo com dados de teste
        const file = XLSX.readFile(path.join(__dirname, "data.xlsx"));
        likert = XLSX.utils.sheet_to_json(file.Sheets["Response"]);
    });

    afterAll(async() => {
        await AppDataSource.initialize();
        try {
            await AppDataSource.getRepository(Log).delete({ Id: idTemp });
        } catch(err) {
            console.log("Erro na finalização dos testes");
        } finally {
            await AppDataSource.destroy();
        }
    });

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
            let result = await request(app).post("/form").send({ questions: data, duration });
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
            result = await request(app).post("/form").send({ questions: data, duration });
            expect(result.body).toEqual(expect.objectContaining({
                statusCode: 400,
                message: `\"questions[40].value\" is required`
            }));
        });

        it("Falha - array de respostas com número de questões diferente de 50", async() => {
            const data = likert.slice(0, 49);
            const result = await request(app).post("/form").send({ questions: data, duration });
            expect(result.body).toEqual(expect.objectContaining({
                statusCode: 444,
                message: "O teste precisa de ao menos 50 questões respondidas"
            }));
        });

        it("Falha - envio de questões não existentes no banco de dados", async() => {
            const data: any[] = [];
            likert.forEach((item, i) => {
                if(i == 40) data.push({ id: 100, value: item.value });
                else data.push(item)
            });
            const result = await request(app).post("/form").send({ questions: data, duration });
            expect(result.body).toEqual(expect.objectContaining({
                statusCode: 444,
                message: "Foram informadas questões não existentes no banco de dados"
            }));
        });

        it("Sucesso - cálculo big-5 efetuado e resposta enviada para o usuário", async() => {
            const result = await request(app).post("/form").send({ questions: likert, ip, duration });
            idTemp = result.body.data.idTemp;
            expect(result.body.message).toBe("");
            expect(result.body.statusCode).toBe(200);
            expect(result.body.data.personality.tag).toBe("ISFP");
            expect(result.body.data.result.length).toBe(5);
            expect(result.body.data.idTemp).toBeGreaterThan(0);
        });

    });
});
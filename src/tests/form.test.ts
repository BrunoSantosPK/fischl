import app from "../app";
import request from "supertest";
import { Questions } from "../interfaces/form";

describe("Sistema de gestão de formulário likert para Big-5", () => {
    beforeAll(async() => {});

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

    /*describe("POST /result - Faz o cálculo do Big-5 para um questionário respondido", () => {
        it("Falha - corpo da requisição com elementos errados");

        it("Falha - array de respostas com número de questões diferente de 50");

        it("Falha - array de respostas com atributos faltantes");

        it("Falha - envio de questões não existentes no banco de dados");

        it("Sucesso - cálculo big-5 efetuado e registro salvo no banco");

        it("Sucesso - cálculo big-5 efetuado e resposta enviada para o usuário");
    });*/
});
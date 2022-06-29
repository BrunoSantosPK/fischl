import AppDataSource from "../data-source";
import { Request, Response } from "express";
import CustomResponse from "../utils/response";
import { Question } from "../entity/Question";
import { ResponseQuestion } from "../interfaces/form";

export default class FormController {

    static async get(request: Request, response: Response) {
        const res = new CustomResponse();

        try {
            // Inicia a conexão
            await AppDataSource.initialize();
            const result = await AppDataSource.manager.find(Question, {relations: {TraitId: true }});
            
            // Envia a resposta
            const data = [];
            result.forEach(item => data.push({
                id: item.Id,
                direction: item.Direction,
                text: item.Text,
                trait: item.TraitId.TranslateName
            }));
            res.setAttr("questions", result);

        } catch(error: any) {
            res.setMessage(error.message);
            res.setStatus(400);

        } finally {
            await AppDataSource.destroy();
            return response.json(res.getJSON());
        }
    }

    static async calc(request: Request, response: Response) {
        const questions = request.body.questions as Array<ResponseQuestion>;
        const res = new CustomResponse();

        try {
            // Inicia a conexão
            await AppDataSource.initialize();

            // Verifica se o número mínimo de questões foi enviada
            if(questions.length < 50)
                throw new Error("O teste precisa de ao menos 50 questões respondidas");

        } catch(error: any) {
            res.setMessage(error.message);
            res.setStatus(444);

        } finally {
            await AppDataSource.destroy();
            return response.json(res.getJSON());
        }
    }

    static async saveMetadata() {}

}
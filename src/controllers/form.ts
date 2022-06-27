import AppDataSource from "../data-source";
import { Request, Response } from "express";
import CustomResponse from "../utils/response";
import { Question } from "../entity/Question";
import { Trait } from "../entity/Trait";

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
            AppDataSource.destroy();
            return response.json(res.getJSON());
        }
    }

    static async process(request: Request, response: Response) {}

    static async saveMetadata() {}

}
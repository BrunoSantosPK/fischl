import { In } from "typeorm";
import { Log } from "../entity/Log";
import { Trait } from "../entity/Trait";
import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { Question } from "../entity/Question";
import CustomResponse from "../utils/response";
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

            // Verifica se as questões informadas estão cadastradas no banco
            const ids: Array<number> = [];
            questions.forEach(item => ids.push(item.id));
            const dataQuestions = await AppDataSource.manager.find(Question, {
                where: { Id: In(ids) },
                relations: { TraitId: true }
            });

            if(dataQuestions.length < 50)
                throw new Error("Foram informadas questões não existentes no banco de dados");

            // Faz o cálculo do big-5
            const result: Array<{trait: string, composition: number}> = [];
            const traits = await AppDataSource.manager.find(Trait);
            traits.forEach(item => {
                let sum = 0, total = 0;
                for(let i = 0; i < dataQuestions.length; i++) {
                    if(dataQuestions[i].TraitId.Id == item.Id) {
                        total += 5;
                        let find = questions.find(element => element.id == dataQuestions[i].Id);
                        if(find) {
                            sum += (dataQuestions[i].Direction == "Positive") ? find.value : 6 - find.value
                        }
                    }
                }
                result.push({
                    trait: item.TranslateName,
                    composition: sum / total
                });
            });

            // Registra dados de acesso
            const insert = await AppDataSource.manager.getRepository(Log).insert({
                IP: request.body?.ip,
                Latitude: request.body?.lat,
                Longitude: request.body?.long,
                Response: JSON.stringify(questions),
                Browser: request.headers["user-agent"]
            });

            // Prepara as respostas para envio
            res.setAttr("result", result);
            res.setAttr("idTemp", insert.generatedMaps[0].Id)

        } catch(error: any) {
            res.setMessage(error.message);
            res.setStatus(444);

        } finally {
            await AppDataSource.destroy();
            return response.json(res.getJSON());
        }
    }

}
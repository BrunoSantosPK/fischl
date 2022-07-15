import AppDataSource from "../data-source";
import { Request, Response } from "express";
import { MBTI, Personality } from "../entity/Personality";
import { TraitDescription } from "../entity/TraitDescription";

export default class PageController {

    static async home(request: Request, response: Response) {
        response.render("pages/home", {lambaroso: "tudo que vier veio"});
    }

    static async result(request: Request, response: Response) {
        // Recupera informações da requisição
        const mbti = request.params.mbti.toUpperCase() as MBTI;
        const params = {
            mbti: "XXXX",
            description: [] as any,
            name: "Perfil comportamental",
            traits: [] as any
        };

        try {
            // Recupera informações sobre o perfil especificado
            await AppDataSource.initialize();
            const result = await AppDataSource.manager.findOne(Personality, {
                where: { Symbol: mbti }
            });

            // Carrega descrições de traços
            const traits = await AppDataSource.manager.find(TraitDescription, {
                relations: { TraitId: true }
            });
            traits.forEach(item => {
                params.traits.push({
                    "level": item.TraitLevel,
                    "name": item.TraitId.TranslateName,
                    "description": item.Description
                });
            });

            // Atualiza parâmetros enviados
            params.name = result?.Name as string;
            params.mbti = result?.Symbol as string;
            params.description = result?.Description.split("\n");

        } catch(error) {
            console.log(error);
        } finally {
            await AppDataSource.destroy();
            response.render("pages/result", params);
        }
    }

}
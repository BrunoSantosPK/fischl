import XLSX from "xlsx";
import path from "path";
import { Trait } from "../entity/Trait";
import AppDataSource from "../data-source";
import { Question } from "../entity/Question";
import { Personality } from "../entity/Personality";
import { TraitDescription } from "../entity/TraitDescription";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

(async() => {
    try {
        // Inclui os traços de personalidade
        await AppDataSource.initialize();
        const result = (await AppDataSource.createQueryBuilder().insert().into(Trait).values([
            { OriginName: "Extraversion", TranslateName: "Sociabilidade" },
            { OriginName: "Agreeableness", TranslateName: "Humanidade" },
            { OriginName: "Conscientiousness", TranslateName: "Lógica" },
            { OriginName: "Emotional Stability", TranslateName: "Estabilidade Emocional" },
            { OriginName: "Imagination", TranslateName: "Imaginação" }
        ]).execute()).generatedMaps;

        // Carrega questões do arquivo
        const addQuestions: QueryDeepPartialEntity<Question>[] = [];
        const file = XLSX.readFile(path.join(__dirname, "data.xlsx"));
        const questions = XLSX.utils.sheet_to_json(file.Sheets["Questions"]);

        questions.forEach((item: any) => {
            addQuestions.push({
                TraitId: result[item.TraitId - 1].Id,
                Direction: item.Direction,
                Text: item.Text
            });
        });
        await AppDataSource.createQueryBuilder().insert()
            .into(Question).values(addQuestions).execute();

        // Carrega descrições de traços de comportamento
        const addDescriptions: QueryDeepPartialEntity<TraitDescription>[] = [];
        const descriptions = XLSX.utils.sheet_to_json(file.Sheets["TraitDescription"]);

        descriptions.forEach((item: any) => {
            addDescriptions.push({
                TraitId: result[item.TraitId - 1].Id,
                TraitLevel: item.Level,
                Description: item.Text,
                Symbol: item.Symbol
            });
        });
        await AppDataSource.createQueryBuilder().insert()
            .into(TraitDescription).values(addDescriptions).execute();

        // Carrega descrições dos perfis MBTI
        const addPersonalities: QueryDeepPartialEntity<Personality>[] = [];
        const personalities = XLSX.utils.sheet_to_json(file.Sheets["Personalities"]);

        personalities.forEach((item: any) => {
            addPersonalities.push({
                Description: item.Description,
                Symbol: item.Symbol,
                Name: item.Name
            });
        });
        await AppDataSource.createQueryBuilder().insert()
            .into(Personality).values(addPersonalities).execute();

        console.log("Seed do banco de dados finalizada com sucesso.")

    } catch(error) {
        console.log(error);
    } finally {
        process.exit(0);
    }
})();
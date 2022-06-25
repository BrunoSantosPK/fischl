import AppDataSource from "../data-source";
import { Question } from "../entity/Question";
import { Trait } from "../entity/Trait";

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

        // Inclui as questões
        await AppDataSource.createQueryBuilder().insert().into(Question).values([
            { TraitId: result[0].Id, Direction: "Positive", Text: "Quando chego em algum lugar, sou reconhecido e sempre movimento as conversas" },
            { TraitId: result[1].Id, Direction: "Negative", Text: "Geralmente me preocupo com as pessoas ao meu redor" },
            { TraitId: result[2].Id, Direction: "Positive", Text: "Eu sempre busco estar preparado para as adversidades" },
            { TraitId: result[3].Id, Direction: "Negative", Text: "Tenho tendência a me estressar com facilidade" },
            { TraitId: result[4].Id, Direction: "Positive", Text: "Sou conhecido por ter um vocabulário rico" },
            { TraitId: result[0].Id, Direction: "Negative", Text: "Eu sou mais reservado e falo pouco" },
            { TraitId: result[1].Id, Direction: "Positive", Text: "Gosto de lidar com pessoas e me envolver com o desenvolvimento" },
            { TraitId: result[2].Id, Direction: "Negative", Text: "Tenho cuidado em sempre deixar minhas coisas perto de mim" },
            { TraitId: result[3].Id, Direction: "Positive", Text: "Sempre mantenho a calma ao longo do dia" },
            { TraitId: result[4].Id, Direction: "Negative", Text: "É difícil para mim acompanhar ideias muito abstratas" },
            { TraitId: result[0].Id, Direction: "Positive", Text: "Sinto-me confortável quando estou perto de várias pessoas" },
            { TraitId: result[1].Id, Direction: "Negative", Text: "Tenho dificuldade em me comunicar e frequentemente sou mal interpretado" },
            { TraitId: result[2].Id, Direction: "Positive", Text: "Presto atenção aos detalhes quando faço minhas atividades" },
            { TraitId: result[3].Id, Direction: "Negative", Text: "Fico sempre muito preocupado e ansioso sobre aquilo que faço" },
            { TraitId: result[4].Id, Direction: "Positive", Text: "Minha criatividade é forte e exercito a imaginação" },
            { TraitId: result[0].Id, Direction: "Negative", Text: "Prefiro fazer minhas atividades fora dos holofotes" },
            { TraitId: result[1].Id, Direction: "Positive", Text: "Tenho empatia pelo sentimento de outras pessoas" },
            { TraitId: result[2].Id, Direction: "Negative", Text: "Acabo me perdendo na organização das atividades que faço" },
            { TraitId: result[3].Id, Direction: "Positive", Text: "Raramente me sinto desanimado e levo o dia a dia sem preocupações" },
            { TraitId: result[4].Id, Direction: "Negative", Text: "Não tenho interesse em assuntos abstratos, somente em coisas que impactem diretamente minha vida" },
            { TraitId: result[0].Id, Direction: "Positive", Text: "Sempre inicio as conversas e discussões nos ambientes que frequento" },
            { TraitId: result[1].Id, Direction: "Negative", Text: "Os problemas de terceiros não me interessam" },
            { TraitId: result[2].Id, Direction: "Positive", Text: "Rapidamente executo as tarefas de minha responsabilidade, sem deixar acumular" },
            { TraitId: result[3].Id, Direction: "Negative", Text: "Facilmente sou pertubado e perco o foco" },
            { TraitId: result[4].Id, Direction: "Positive", Text: "Tenho sempre boas ideias" },
            { TraitId: result[0].Id, Direction: "Negative", Text: "Sou uma pessoa de poucas palavras" },
            { TraitId: result[1].Id, Direction: "Positive", Text: "Geralmente me compadeço por outras pessoas" },
            { TraitId: result[2].Id, Direction: "Negative", Text: "Com frequência esqueço de organizar as coisas que utilizo" },
            { TraitId: result[3].Id, Direction: "Negative", Text: "Me irrito com facilidade" },
            { TraitId: result[4].Id, Direction: "Negative", Text: "Considero que não tenho uma imaginação fértil" },
            { TraitId: result[0].Id, Direction: "Positive", Text: "Costumo conversar com pessoas de hábitos e pensamentos diferentes dos meus" },
            { TraitId: result[1].Id, Direction: "Negative", Text: "Envolver-me com outras pessoas não é um interesse meu" },
            { TraitId: result[2].Id, Direction: "Positive", Text: "Missão dada é missão cumprida" },
            { TraitId: result[3].Id, Direction: "Negative", Text: "Meu humor sofre variações com frequência" },
            { TraitId: result[4].Id, Direction: "Positive", Text: "Sou rápido para entender novas coisas" },
            { TraitId: result[0].Id, Direction: "Negative", Text: "Não gosto de chamar atenção para mim" },
            { TraitId: result[1].Id, Direction: "Positive", Text: "Não me importo de disponibilizar tempo para ouvir outras pessoas" },
            { TraitId: result[2].Id, Direction: "Negative", Text: "Tento fugir das responsabilidades" },
            { TraitId: result[3].Id, Direction: "Positive", Text: "Meu humor é geralmente constante" },
            { TraitId: result[4].Id, Direction: "Positive", Text: "Gosto de utilizar palavras diferentes no meu vocabulário" },
            { TraitId: result[0].Id, Direction: "Positive", Text: "Não me sinto desconfortável em ser o centro das atenções" },
            { TraitId: result[1].Id, Direction: "Positive", Text: "Consigo entender os sentimentos das outras pessoas" },
            { TraitId: result[2].Id, Direction: "Positive", Text: "Sempre sigo o cronograma" },
            { TraitId: result[3].Id, Direction: "Negative", Text: "Fico irritado com facilidade" },
            { TraitId: result[4].Id, Direction: "Positive", Text: "Uso bastante tempo pensando antes de agir" },
            { TraitId: result[0].Id, Direction: "Negative", Text: "Não interajo muito com pessoas desconhecidas" },
            { TraitId: result[1].Id, Direction: "Positive", Text: "As pessoas se sentem a vontade próximas à mim" },
            { TraitId: result[2].Id, Direction: "Positive", Text: "Tenho alta exigência de qualidade no meu trabalho" },
            { TraitId: result[3].Id, Direction: "Negative", Text: "Frequentemente me sinto desanimado" },
            { TraitId: result[4].Id, Direction: "Positive", Text: "Sempre estou cheio de ideias novas" }
        ]).execute();

        console.log("Seed do banco de dados finalizada com sucesso.")

    } catch(error) {
        console.log(error);
    } finally {
        process.exit(0);
    }
})();
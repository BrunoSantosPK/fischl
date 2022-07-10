import { LevelSymbol, TraitLevel } from "../entity/TraitDescription";
import { StatusCode } from "../utils/response";

export type ResponseLikert = 1 | 2 | 3 | 4 | 5;

export interface Questions {
    id: number;
    direction: string;
    text: string,
    trait: string
}

export interface ResultCalcTrait {
    traitLevel: TraitLevel;
    score: number;
    trait: string,
    traitId?: number,
    traitSymbol?: LevelSymbol,
    description?: string,
}

export interface GetQuestions {
    statusCode: StatusCode;
    message: string;
    data: {
        questions: Array<Questions>
    }
}

export interface ResponseQuestion {
    id: number;
    value: ResponseLikert;
}
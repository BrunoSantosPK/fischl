import { StatusCode } from "../utils/response";

export interface Questions {
    id: number;
    direction: string;
    text: string,
    trait: string
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
    value: 1 | 2 | 3 | 4 | 5
}
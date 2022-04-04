import { Question } from "../../../src/interfaces/question";

export interface Quiz {
    id: number;
    title: string;
    description: string;
    questions: Question[];
}

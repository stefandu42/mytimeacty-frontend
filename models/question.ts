import { Answer } from "./answer";

export interface Question {
  idQuestion: number;
  question: string;
  numQuestion: number;
  answers: Answer[];
}

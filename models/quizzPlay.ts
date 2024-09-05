import { User } from "./user";

export interface QuizzPlay {
  idQuizzPlay: number;
  quizzId: number;
  player: User;
  score: number;
  playedAt: string;
}

export interface QuizzPlayWithAnswer extends QuizzPlay {
  userAnswers: UserAnswer[];
}

export interface UserAnswer {
  idUserAnswer: number;
  answerId: number;
}

export interface UserAnswerCreate {
  answerId: number;
}

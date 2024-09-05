export interface QuizzPlay {
  idQuizzPlay: number;
  quizzId: number;
  playerId: number;
  score: number;
  playedAt: string;
}

export interface UserAnswer {
  idUserAnswer: number;
  quizzPlayId: number;
  answerId: number;
}

export interface UserAnswerCreate {
  answerId: number;
}

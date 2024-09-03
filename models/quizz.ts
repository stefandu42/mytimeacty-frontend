export interface QuizzCategory {
  idCategory: number;
  label: string;
}

export interface QuizzLevel {
  idLevel: number;
  label: string;
}

export interface Quizz {
  idQuizz: number;
  title: string;
  creatorId: number;
  creatorNickname: string;
  category: QuizzCategory;
  level: QuizzLevel;
  createdAt: string;
}

export interface QuizzWithLikeAndFavourite extends Quizz {
  liked: boolean;
  favourite: boolean;
}

// Creation

export interface QuizzCreateAnswer {
  answer: string;
  numAnswer: number;
  isCorrect: boolean;
}

export interface QuizzCreateQuestion {
  question: string;
  numQuestion: number;
  answers: QuizzCreateAnswer[];
}

export interface QuizzCreate {
  title: string;
  levelId: number;
  categoryId: number;
  img: string | null;
  questions: QuizzCreateQuestion[];
}

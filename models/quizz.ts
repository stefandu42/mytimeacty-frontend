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

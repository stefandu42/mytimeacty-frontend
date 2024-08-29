import { Quizz } from "@/models/quizz";
import apiClient from "../axiosConfig"; // Assurez-vous que le chemin est correct

const BASE_URL = "/quizzes";

const QuizzService = {
  createQuizz: async (quizzCreateDTO: any): Promise<Quizz> => {
    try {
      const response = await apiClient.post(`${BASE_URL}`, quizzCreateDTO);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create quizz");
    }
  },

  getQuizzes: async (
    page: number = 0,
    size: number = 15,
    title?: string,
    nickname?: string,
    categoryLabel?: string,
    levelLabel?: string
  ): Promise<{ content: Quizz[]; totalPages: number }> => {
    try {
      const response = await apiClient.get<{
        content: Quizz[];
        totalPages: number;
      }>(`${BASE_URL}`, {
        params: { page, size, title, nickname, categoryLabel, levelLabel },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to get quizzes");
    }
  },

  getLikedQuizzes: async (
    idUser: number,
    page: number = 0,
    size: number = 15,
    title?: string,
    categoryLabel?: string,
    levelLabel?: string
  ): Promise<{ content: Quizz[]; totalPages: number }> => {
    try {
      const response = await apiClient.get(
        `${BASE_URL}/likes/users/${idUser}`,
        {
          params: { page, size, title, categoryLabel, levelLabel },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to get liked quizzes");
    }
  },

  getFavouriteQuizzes: async (
    idUser: number,
    page: number = 0,
    size: number = 15,
    title?: string,
    categoryLabel?: string,
    levelLabel?: string
  ): Promise<{ content: Quizz[]; totalPages: number }> => {
    try {
      const response = await apiClient.get(
        `${BASE_URL}/favourites/users/${idUser}`,
        {
          params: { page, size, title, categoryLabel, levelLabel },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to get favourite quizzes");
    }
  },

  favouriteQuizz: async (idQuizz: number): Promise<void> => {
    try {
      await apiClient.post(`${BASE_URL}/favourite/${idQuizz}`);
    } catch (error) {
      throw new Error("Failed to favourite quizz");
    }
  },

  unfavouriteQuizz: async (idQuizz: number): Promise<void> => {
    try {
      await apiClient.delete(`${BASE_URL}/favourite/${idQuizz}`);
    } catch (error) {
      throw new Error("Failed to unfavourite quizz");
    }
  },

  likeQuizz: async (idQuizz: number): Promise<void> => {
    try {
      await apiClient.post(`${BASE_URL}/like/${idQuizz}`);
    } catch (error) {
      throw new Error("Failed to like quizz");
    }
  },

  unlikeQuizz: async (idQuizz: number): Promise<void> => {
    try {
      await apiClient.delete(`${BASE_URL}/like/${idQuizz}`);
    } catch (error) {
      throw new Error("Failed to unlike quizz");
    }
  },

  hideQuiz: async (quizzId: number): Promise<string> => {
    try {
      const response = await apiClient.put(`${BASE_URL}/${quizzId}/hide`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to hide quizz");
    }
  },
};

export default QuizzService;

import { QuizzPlay, UserAnswer, UserAnswerCreate } from "@/models/quizzPlay";
import apiClient from "../axiosConfig";

const BASE_URL = "/quizz-play";

const QuizzPlayService = {
  submitUserAnswers: async (
    quizzId: number,
    userAnswers: UserAnswerCreate[]
  ): Promise<void> => {
    try {
      await apiClient.post(`${BASE_URL}/quizzes/${quizzId}`, userAnswers);
    } catch (error) {
      console.error("Error submitting user answers:", error);
      throw new Error("Failed to submit user answers");
    }
  },

  getQuizzPlaysByQuizz: async (
    quizzId: number,
    page: number = 0,
    size: number = 15
  ): Promise<{ content: QuizzPlay[]; totalPages: number }> => {
    try {
      const response = await apiClient.get<{
        content: QuizzPlay[];
        totalPages: number;
      }>(`${BASE_URL}/quizzes/${quizzId}/plays`, {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching quizz plays:", error);
      throw new Error("Failed to fetch quizz plays");
    }
  },

  getUserAnswersByQuizzPlay: async (
    quizzPlayId: number
  ): Promise<UserAnswer[]> => {
    try {
      const response = await apiClient.get<UserAnswer[]>(
        `${BASE_URL}/${quizzPlayId}/answers`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user answers:", error);
      throw new Error("Failed to fetch user answers");
    }
  },
};

export default QuizzPlayService;

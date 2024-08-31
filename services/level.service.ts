import apiClient from "../axiosConfig";
import { QuizzLevel } from "@/models/quizz";

const LevelService = {
  getAllLevels: async (): Promise<QuizzLevel[]> => {
    try {
      const response = await apiClient.get<QuizzLevel[]>("/levels");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch levels");
    }
  },
};

export default LevelService;

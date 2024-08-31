import apiClient from "../axiosConfig";
import { QuizzCategory } from "@/models/quizz";

const CategoryService = {
  getAllCategories: async (): Promise<QuizzCategory[]> => {
    try {
      const response = await apiClient.get<QuizzCategory[]>("/categories");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch categories");
    }
  },
};

export default CategoryService;

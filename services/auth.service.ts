import { Login, Register } from "@/models/auth";
import apiClient from "../axiosConfig";

const BASE_URL = "/auth";

const AuthService = {
  login: async (loginDTO: Login): Promise<string> => {
    try {
      const response = await apiClient.post(`${BASE_URL}/login`, loginDTO);
      return response.data; // Le token JWT
    } catch (error) {
      throw new Error("Login failed");
    }
  },

  register: async (userCreateDTO: Register): Promise<string> => {
    try {
      const response = await apiClient.post(
        `${BASE_URL}/register`,
        userCreateDTO
      );
      return response.data; // Message de succès
    } catch (error) {
      throw new Error("Registration failed");
    }
  },

  // Fonction pour la vérification de compte
  verifyAccount: async (token: string): Promise<string> => {
    try {
      const response = await apiClient.put(`${BASE_URL}/verify/${token}`);
      return response.data; // Message de succès
    } catch (error) {
      throw new Error("Account verification failed");
    }
  },
};

export default AuthService;

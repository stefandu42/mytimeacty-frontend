import { Login } from "@/models/auth/login";
import { Register } from "@/models/auth/register";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AuthService = {
  login: async (loginDTO: Login): Promise<string> => {
    try {
      console.log(API_BASE_URL);
      const response = await axios.post(`${API_BASE_URL}/auth/login`, loginDTO);
      return response.data; // Le token JWT
    } catch (error) {
      throw new Error("Login failed");
    }
  },

  register: async (userCreateDTO: Register): Promise<string> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
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
      const response = await axios.put(`${API_BASE_URL}/auth/verify/${token}`);
      return response.data; // Message de succès
    } catch (error) {
      throw new Error("Account verification failed");
    }
  },
};

export default AuthService;

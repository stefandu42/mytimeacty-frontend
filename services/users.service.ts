import { UserProfile, UserDetails } from "@/models/user";
import apiClient from "../axiosConfig";

const BASE_URL = "/users";

const UserService = {
  getUserProfile: async (userId: number): Promise<UserProfile> => {
    try {
      const { data } = await apiClient.get<UserProfile>(
        `${BASE_URL}/${userId}/profile`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to fetch user profile");
    }
  },

  getFilteredUsers: async (
    nickname: string = "",
    page: number = 0,
    size: number = 15
  ) => {
    try {
      const { data } = await apiClient.get<{
        content: UserDetails[];
        totalPages: number;
      }>(BASE_URL, { params: { nickname, page, size } });
      return data;
    } catch (error) {
      throw new Error("Failed to fetch filtered users");
    }
  },

  banUser: async (userId: number): Promise<string> => {
    try {
      const { data } = await apiClient.put<string>(`${BASE_URL}/${userId}/ban`);
      return data;
    } catch (error) {
      throw new Error("Failed to ban user");
    }
  },

  unbanUser: async (userId: number): Promise<string> => {
    try {
      const { data } = await apiClient.put<string>(
        `${BASE_URL}/${userId}/unban`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to unban user");
    }
  },

  promoteUserToAdmin: async (userId: number): Promise<string> => {
    try {
      const { data } = await apiClient.put<string>(
        `${BASE_URL}/${userId}/promote-to-admin`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to promote user to admin");
    }
  },

  promoteAdminToChief: async (userId: number): Promise<string> => {
    try {
      const { data } = await apiClient.put<string>(
        `${BASE_URL}/${userId}/promote-to-chief`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to promote admin to chief");
    }
  },

  demoteAdminToUser: async (userId: number): Promise<string> => {
    try {
      const { data } = await apiClient.put<string>(
        `${BASE_URL}/${userId}/demote-to-user`
      );
      return data;
    } catch (error) {
      throw new Error("Failed to demote admin to user");
    }
  },
};

export default UserService;

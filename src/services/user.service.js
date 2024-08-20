
import { api } from "@/api/inteceptor";

export const getUserByUsername = async (username) => {
    try {
      const response = await api.get(`/api/v1/user/getUserByUsername?username=${username}`);
      return response;
    } catch (error) {
      return error;
    }
  };
  
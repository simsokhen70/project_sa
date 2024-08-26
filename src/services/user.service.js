
import ihttp, { api } from "@/api/inteceptor";

export const getUserByUsername = async (username) => {
    try {
      const response = await ihttp.get(`/api/v1/user/getUserByUsername?username=${username}`);
      return response;
    } catch (error) {
      return error;
    }
  };

  export const getAllUsers = async () => {
    try {
      const response = await ihttp.get(`/api/v1/user/getAllUsers`);
      return response;
    } catch (error) {
      return error;
    }
  };

  export const dontAskAgain = async (username) => {
    try {
      const response = await ihttp.put(`/api/v1/user/changeCheck?username=${username}`);
      return response;
    } catch (error) {
      return error;
    }
  };
  
  
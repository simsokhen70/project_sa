import { api, ihttp } from "@/api/inteceptor";


export const signInUser = async (username, password) => {
    try {
        const data = {
            username: username,
            password: password
        }
      const response = await api.post(`/api/v1/auth/login`, data);
      return response;
    } catch (error) {
      return error;
    }
  };

  export const signInUserBody = async ( reqBody ) => {
    try {
      const response = await api.post(`/api/v1/auth/login`, reqBody, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      }); 
      console.log({response})
      return response;
    } catch (error) {
      return error;
    }
  };

  export const registerUser = async (username, password, email, profile) => {
    try {
        const data = {
            username: username,
            password: password,
            email: email,
            profile: profile
        }
      const response = await api.post(`/api/v1/auth/register`, data);
      return response;
    } catch (error) {
      return error;
    }
  };


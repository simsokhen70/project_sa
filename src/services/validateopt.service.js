
import { api } from "@/api/inteceptor";


export const validateOtpToVerifiedRegister = async (email, otp_code) => {
    try {
        const data = {
            email: email,
            otp: otp_code
        }
      const response = await api.post(`/api/v1/auth/verified-otp`, data);
      return response;
    } catch (error) {
      return error;
    }
  };
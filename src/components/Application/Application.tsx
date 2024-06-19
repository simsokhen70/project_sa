import ihttp from "@/api/inteceptor";

export const getApp = async (userId)=>{
  const API_URL = process.env.apiUrl
  console.log("afsdasfsadf, ", API_URL)
  return await ihttp.get(`${API_URL}/api/v1/project/getAllProjectByUserId/${userId}`);
}
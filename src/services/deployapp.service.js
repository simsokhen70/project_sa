import {api} from "@/api/inteceptor";

export const deployHtml = async (userId, parentDirectory, branchName, repoUrl, imageName) => {
    try {
      const response = await api.get(`/api/v1/web/build-docker-image?userId=${userId}&parentDirectory=${parentDirectory}&branchName=${branchName}&repoUrl=${repoUrl}&imageName=${imageName}`);
      return response;
    } catch (error) {
      return error;
    }
};

export const runningApp = async (userId, containerName, imageName, port) => {
    try {
      const response = await api.post(`/api/v1/web/run-docker-container?userId=${userId}&containerName=${containerName}&imageName=${imageName}&port=${port}`);
      return response;
    } catch (error) {
      return error;
    }
};

export const configDomain = async (serverName, port) => {
  try {
    const response = await api.post(`/api/v1/web/config-domain?name=${serverName}&serverName=${serverName}&port=${port}`);
    return response;
  } catch (error) {
    return error;
  }
};
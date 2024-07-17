import {api} from "@/api/inteceptor";

export const deployHtml = async (parentDirectory, branchName, repoUrl, imageName) => {
    try {
      const response = await api.get(`/api/v1/web/build-docker-image?parentDirectory=${parentDirectory}&branchName=${branchName}&repoUrl=${repoUrl}&imageName=${imageName}`);
      return response;
    } catch (error) {
      return error;
    }
};

export const runningApp = async (containerName, imageName, port) => {
    try {
      const response = await api.post(`/api/v1/web/run-docker-container?containerName=${containerName}&imageName=${imageName}&port=${port}`);
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
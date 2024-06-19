import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";


export const API_URL = process.env.apiUrl;



// Without Token
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type" : "TEXT_EVENT_STREAM_VALUE"
  }
});

// With Token
// const ihttp = axios.create({
//   baseURL: API_URL,
// });

// // Getting Session
// export async function getSession() {

//   try {
//     const headers = { 'Authorization': `Bearer ${token}`};
//     const res = await fetch(`${API_URL}/api/v1/session?token=${encodeURIComponent(token!)}&key=${encodeURIComponent(KEY!)}`, { headers });
//     if (!res.ok) {
//       return res.status;
//     }
//     const data = await res.json();
//     session = data.payload;
//     localStorage.setItem("tid", session?.token);
//     return session;
//   } catch (e) {
//     console.error("Error: ", e);
//     throw e;
//   }
// }

// (async () => {
//   await getSession();
// })();

// async function requestInterceptor(config: InternalAxiosRequestConfig) {
//   if (!session) {
//       await getSession();
//   }
//   const idToken: any = session;
//   if (!idToken) {
//     return Promise.reject("missing access token");
//   }
//   config.headers["Authorization"] = `Bearer ${idToken?.token}`;
//   config.headers["Content-Type"] = "application/json";
//   return config;
// }
// async function requestInterceptorFormData(
//   config: InternalAxiosRequestConfig
// ) {
//   if (!session) {
//       await getSession();
//   }
//   const idToken: any = session;
//   if (!idToken) {
//     return Promise.reject("missing access token");
//   }
//   config.headers["Authorization"] = `Bearer ${idToken?.token}`;
//   config.headers["Content-Type"] = "multipart/form-data";
//   return config;
// }

// async function responseInterceptor(value: AxiosResponse<any, any>) {
//   return value;
// }

// async function responseErrorInterceptor({ status, code, ...err }: AxiosError) {
//   const isNotWorkError = code == "ERR_NETWORK";
//   if (isNotWorkError) {
//     try {
//       //
//       window.location.pathname = "/error"
//     } catch {
//     }
//   }
//   return Promise.reject({ ...err, status, code });
// }

// ihttp.interceptors.request.use(requestInterceptor);
// ihttp.interceptors.response.use(responseInterceptor, responseErrorInterceptor);


// export const ihttpFormData = axios.create({
//   baseURL: API_URL,
// });
// ihttpFormData.interceptors.request.use(requestInterceptorFormData);
// ihttpFormData.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
// export default ihttp;
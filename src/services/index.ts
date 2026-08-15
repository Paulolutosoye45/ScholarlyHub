import axios,  { type AxiosInstance,  type AxiosResponse } from "axios";
import { token } from "@/utils";

 export const API: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use(
  (config) => {
    const accessToken = token.getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      token.clearTokens();
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("schoolInfo");

      if (window.location.pathname !== "/auth") {
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

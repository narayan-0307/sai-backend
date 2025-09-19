import axios from "axios";
import { useAuthStore } from "@renderer/zustand/authStore";
// import { useNavigate } from "react-router-dom";

const API = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_URL || "http://localhost:4000",
});

API.interceptors.request.use(function (config) {
  const token = useAuthStore.getState().user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);
export { API };

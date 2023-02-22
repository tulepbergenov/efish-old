import { getToken } from "@/utilities";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const api = axios.create({
  baseURL: API_KEY,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

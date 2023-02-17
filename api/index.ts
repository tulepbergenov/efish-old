import { getToken } from "@/utilities";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.efish-test.airweb.kz/api/v1/",
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

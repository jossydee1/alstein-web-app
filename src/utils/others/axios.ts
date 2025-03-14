import axios from "axios";
import { getBaseURL } from "./envUtils";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Authorization Token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token"); // Adjust based on auth strategy
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default api;

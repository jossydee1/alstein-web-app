import axios from "axios";
import { getAPIBaseURL } from "../others";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: getAPIBaseURL(),
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Authorization Token
api.interceptors.request.use(
  config => {
    const token = null; // Adjust based on auth strategy
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default api;

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
    // Ensure localStorage is available
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("userToken") || "";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor: Handle 403/401 status codes
api.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 403 || error?.response?.status === 401) {
      // Ensure localStorage is available
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("userId");
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        localStorage.removeItem("businessProfile");
      }

      // Redirect to login page if not already there
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/login")
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;

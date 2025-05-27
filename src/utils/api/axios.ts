import axios from "axios";
import { getAPIBaseURL } from "../others";
import Cookies from "js-cookie";

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
    if (typeof window !== "undefined") {
      const token = Cookies.get("userToken");
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
      if (typeof window !== "undefined") {
        Cookies.remove("userId");
        Cookies.remove("userToken");
        Cookies.remove("user");
        Cookies.remove("businessProfile");

        // Redirect to login if not already there
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;

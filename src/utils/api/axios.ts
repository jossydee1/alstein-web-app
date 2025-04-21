import axios from "axios";
import { getAPIBaseURL } from "../others";
import { useAuth } from "@/context";

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

// Response Interceptor: Handle 403 status code
api.interceptors.response.use(
  response => response,
  error => {
    if (
      error?.response?.status === 403 ||
      error?.response?.status === 401 ||
      error?.response?.code === 403 ||
      error?.response?.code === 401
    ) {
      const { logout } = useAuth(); // Access logout function
      logout(); // Log out the user
    }
    return Promise.reject(error);
  },
);

export default api;

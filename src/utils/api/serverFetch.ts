/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./axios";
import { API_URL } from "../others";

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export async function serverFetch(url: string) {
  try {
    const res = await api.get(`${API_URL}${url}`);
    const data = await res.data;
    return data.data;
  } catch (error: any) {
    // Log the detailed error for debugging
    console.error("API request failed:", {
      url: `${API_URL}${url}`,
      error: {
        message: error.message,
        code: error.code,
        response: error.response?.data,
      },
    });

    // Return empty data instead of throwing errors
    if (
      error.code === "ENOTFOUND" ||
      error.code === "ECONNREFUSED" ||
      error.message?.includes("Network Error") ||
      !navigator.onLine ||
      error.code === "ETIMEDOUT" ||
      error.code === "ECONNABORTED"
    ) {
      return null;
    }

    // Return null for other errors
    return null;
  }
}

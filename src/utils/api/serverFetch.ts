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

    // Create user-friendly error messages for network-related issues
    if (
      error.code === "ENOTFOUND" ||
      error.code === "ECONNREFUSED" ||
      error.message?.includes("Network Error") ||
      !navigator.onLine
    ) {
      throw new NetworkError(
        "Unable to connect to the server. Please check your internet connection and try again.",
      );
    }

    // Handle timeout errors
    if (error.code === "ETIMEDOUT" || error.code === "ECONNABORTED") {
      throw new NetworkError(
        "The server is taking too long to respond. Please try again later.",
      );
    }

    // Re-throw other errors
    throw error;
  }
}

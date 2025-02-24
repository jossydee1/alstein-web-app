/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const formatError = (err: any, fallback?: string) => {
  let error = "";

  if (axios.isAxiosError(err)) {
    error = err.response?.data?.message || fallback;
  } else if (err instanceof Error) {
    error = err.message;
  } else {
    error = "An unknown error occurred";
  }

  return error;
};

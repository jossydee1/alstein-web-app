import axios from "axios";

export const formatError = (
  err: unknown,
  fallback: string = "An unknown error occurred",
) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || fallback;
  } else if (err instanceof Error) {
    return err.message;
  }
  return fallback;
};

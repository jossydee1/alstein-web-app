import axios from "axios";

export const formatError = (
  err: unknown,
  fallback: string = "An unknown error occurred",
) => {
  if (axios.isAxiosError(err)) {
    const message = err.response?.data?.message;

    if (typeof message === "string") {
      return message; // ✅ Safe string message
    }

    if (Array.isArray(message)) {
      return message.join(", "); // ✅ Convert array to readable string
    }

    if (typeof message === "object" && message !== null) {
      // return JSON.stringify(message); // ✅ Convert object to string
      return fallback;
    }
  } else if (err instanceof Error) {
    return err.message;
  }

  return fallback;
};

export const getBaseURL = () => {
  if (typeof window === "undefined") return "https://alstein.com/"; // Default for SSR

  const hostname = window.location.hostname;

  if (hostname.includes("alstein.com")) {
    return "https://alstein.com/";
  } else if (hostname.includes("localhost")) {
    return "http://localhost:3000/";
  }
  return "http://localhost:3000/";
};

export const getAPIBaseURL = () => {
  if (typeof window === "undefined") return "https://alstein.com/dev"; // Default for SSR

  const hostname = window.location.hostname;

  if (hostname.includes("alstein.com")) {
    return "https://alstein.com/dev";
  } else if (hostname.includes("localhost")) {
    return "https://gg1l8ijqo1.execute-api.us-east-1.amazonaws.com/dev";
  }
  return "https://gg1l8ijqo1.execute-api.us-east-1.amazonaws.com/dev";
};

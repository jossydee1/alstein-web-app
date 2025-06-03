// Base URLs
const PROD_BASE_URL = "https://alstein.com/";
const DEV_BASE_URL = "https://dev.d2c97uqymf1ypm.amplifyapp.com/";
const LOCAL_BASE_URL = "http://localhost:3000/";

// API URLs
const PROD_API_URL =
  "https://o8ucgebdc2.execute-api.us-east-1.amazonaws.com/prod";
const DEV_API_URL =
  "https://gg1l8ijqo1.execute-api.us-east-1.amazonaws.com/dev";

export const getBaseURL = () => {
  if (typeof window === "undefined") return ""; // Default for SSR

  const hostname = window.location.hostname;

  if (hostname.includes("alstein.com")) {
    return PROD_BASE_URL;
  } else if (hostname.includes("dev.d2c97uqymf1ypm.amplifyapp.com")) {
    return DEV_BASE_URL;
  } else if (hostname.includes("localhost:3000")) {
    return LOCAL_BASE_URL;
  }
  return PROD_BASE_URL;
};

export const getAPIBaseURL = () => {
  if (typeof window === "undefined") return ""; // Default for SSR

  const hostname = window.location.hostname;

  if (hostname.includes("alstein.com")) {
    return PROD_API_URL;
  } else if (hostname.includes("dev.d2c97uqymf1ypm.amplifyapp.com")) {
    return DEV_API_URL;
  } else if (hostname.includes("localhost")) {
    return DEV_API_URL;
  }
  return PROD_API_URL;
};

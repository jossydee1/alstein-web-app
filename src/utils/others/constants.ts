export const API_URL =
  "https://gg1l8ijqo1.execute-api.us-east-1.amazonaws.com/dev";
export const PAYSTACK_PUBLIC_TEST_KEY =
  "pk_test_b14df591038d0b42d030b17d377d8cb5fabce945";
export const PAYSTACK_TEST_KEY =
  "pk_test_b14df591038d0b42d030b17d377d8cb5fabce945";
export const DOCUMENT_URL =
  "https://alstein-dev-storage.s3.us-east-1.amazonaws.com/";
export const CATEGORY_URL =
  "https://alstein-website-files.s3.us-east-1.amazonaws.com/";

export const COOKIE_OPTIONS = {
  // secure: isProduction,

  // const isProduction = process.env.NODE_ENV === "production";
  secure:
    typeof window !== "undefined" && window.location.protocol === "https:", //TODO: update this if using environment variables
  sameSite: "Strict" as const,
  expires: 1 / 4.8, // ~5 hours
};

export const INTERCOM_APP_ID = "yt0f6x96";

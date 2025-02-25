export type CustomNodeEnv = "local" | "development" | "staging" | "production";

const envUrls: { [key in CustomNodeEnv]: string } = {
  local: process.env.NEXT_PUBLIC_LOCAL_URL || "",
  development: process.env.NEXT_PUBLIC_DEVELOPMENT_URL || "",
  staging: process.env.NEXT_PUBLIC_STAGING_URL || "",
  production: process.env.NEXT_PUBLIC_PRODUCTION_URL || "",
};

export const getEnvUrl = (): string => {
  const env = process.env.NEXT_PUBLIC_NODE_ENV as CustomNodeEnv;
  return envUrls[env];
};

// example
// const envUrl = getEnvUrl();
// alert(envUrl);
// Output: https://example.com

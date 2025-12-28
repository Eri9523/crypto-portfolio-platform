import { AppConfig } from "@monorepo-template/lib";

export const createAppConfig = (): AppConfig => {
  const apiKey = import.meta.env.VITE_MORALIS_API_KEY;
  const baseUrl = import.meta.env.VITE_MORALIS_BASE_URL;
  
  if (!apiKey || !baseUrl) {
    throw new Error("Missing required environment variables: VITE_MORALIS_API_KEY, VITE_MORALIS_BASE_URL");
  }

  return {
    moralis: {
      apiKey,
      baseUrl,
    },
  };
};
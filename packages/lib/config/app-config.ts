export interface AppConfig {
  moralis: {
    apiKey: string;
    baseUrl: string;
  };
}

export interface ConfigProvider {
  getConfig(): AppConfig;
}
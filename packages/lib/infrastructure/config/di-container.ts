import { WalletService } from "../../domain/services/wallet.service";
import { MoralisAdapter } from "../adapters/moralis.adapter";
import { AppConfig } from "../../config/app-config";

// Simple DI container
class DIContainer {
  private static instance: DIContainer;
  private walletService: WalletService | null = null;
  private appConfig: AppConfig | null = null;

  private constructor() {}

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  // Método para inicializar la configuración desde la app
  initialize(config: AppConfig): void {
    this.appConfig = config;
  }

  getWalletService(): WalletService {
    if (!this.appConfig) {
      throw new Error("DI Container not initialized. Call initialize(config) first.");
    }

    if (!this.walletService) {
      const moralisAdapter = new MoralisAdapter({
        apiKey: this.appConfig.moralis.apiKey,
        baseUrl: this.appConfig.moralis.baseUrl,
      });
      this.walletService = new WalletService(moralisAdapter);
    }
    return this.walletService;
  }

  // Método para testing - permite inyectar mocks
  setWalletService(service: WalletService): void {
    this.walletService = service;
  }
}

export const diContainer = DIContainer.getInstance();
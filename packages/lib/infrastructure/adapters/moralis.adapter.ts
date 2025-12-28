import {
  WalletCollection,
  NFT,
  WalletToken,
} from "../../domain/entities/wallet";
import {
  GetCollectionNFTsParams,
  GetWalletCollectionsParams,
  GetWalletTokensParams,
  NFTRepositoryPort,
  PaginatedResponse,
} from "../../domain/ports/nft-repository.port";

export interface MoralisConfig {
  apiKey: string;
  baseUrl: string;
}

export class MoralisAdapter implements NFTRepositoryPort {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: MoralisConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl;
  }

  private async makeRequest<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-Key": this.apiKey,
      },
    };

    try {
      const response = await fetch(url.toString(), options);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  private mapToWalletCollection(result: any): WalletCollection {
    return {
      tokenAddress: result.token_address,
      name: result.name || "Unknown",
      symbol: result.symbol || "",
      contractType: result.contract_type,
      verified: result.verified_collection,
      logo: result.collection_logo,
      banner: result.collection_banner_image,
      floorPrice: result.floor_price,
      floorPriceUsd: result.floor_price_usd,
      floorPriceCurrency: result.floor_price_currency,
    };
  }

  private mapToNFT(result: any): NFT {
    let image = result.normalized_metadata?.image || null;

    // Convertir IPFS a HTTP gateway
    if (image?.startsWith("ipfs://")) {
      image = image.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    return {
      tokenAddress: result.token_address,
      tokenId: result.token_id,
      contractType: result.contract_type,
      name: result.normalized_metadata?.name || result.name,
      symbol: result.symbol,
      image: image,
    };
  }

  private mapToWalletToken(result: any): WalletToken {
    return {
      tokenAdress: result.token_address,
      name: result.name,
      balance: result.balance,
      balanceUsd: result.usd_price,
      logo: result.logo,
      banner: result.thumbnail,
    };
  }

  async getWalletCollections(
    params: GetWalletCollectionsParams
  ): Promise<PaginatedResponse<WalletCollection>> {
    const queryParams: Record<string, string> = {
      chain: params.chain || "ronin",
      limit: (params.limit || 25).toString(),
      exclude_spam: "true",
    };

    if (params.cursor) {
      queryParams.cursor = params.cursor;
    }

    const response = await this.makeRequest<any>(
      `/${params.address}/nft/collections`,
      queryParams
    );

    return {
      data: (response.result || []).map((item: any) =>
        this.mapToWalletCollection(item)
      ),
      cursor: response.cursor || null,
      hasMore: !!response.cursor,
    };
  }

  async getCollectionNFTs(
    params: GetCollectionNFTsParams
  ): Promise<PaginatedResponse<NFT>> {
    const queryParams: Record<string, string> = {
      chain: params.chain || "ronin",
      limit: (params.limit || 25).toString(),
      "token_addresses[0]": params.collection,
    };

    if (params.cursor) {
      queryParams.cursor = params.cursor;
    }

    const response = await this.makeRequest<any>(
      `/${params.address}/nft`,
      queryParams
    );

    return {
      data: (response.result || []).map((item: any) => this.mapToNFT(item)),
      cursor: response.cursor || null,
      hasMore: !!response.cursor,
    };
  }

  async getWalletTokens(
    params: GetWalletTokensParams
  ): Promise<PaginatedResponse<WalletToken>> {
    const queryParams: Record<string, string> = {
      chain: params.chain || "ronin",
      limit: (params.limit || 25).toString(),
      exclude_spam: "true",
    };

    if (params.cursor) {
      queryParams.cursor = params.cursor;
    }

    const response = await this.makeRequest<any>(
      `/wallets/${params.address}/tokens`,
      queryParams
    );

    return {
      data: (response.result || []).map((item: any) =>
        this.mapToWalletToken(item)
      ),
      cursor: response.cursor || null,
      hasMore: !!response.cursor,
    };
  }
}

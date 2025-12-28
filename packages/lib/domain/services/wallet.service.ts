import { WalletCollection, WalletToken, NFT } from "../entities/wallet";
import {
  GetWalletCollectionsParams,
  GetCollectionNFTsParams,
  GetWalletTokensParams,
  NFTRepositoryPort,
  PaginatedResponse,
} from "../ports/nft-repository.port";

export class WalletService {
  constructor(private readonly nftRepository: NFTRepositoryPort) {}

  async getWalletCollections(
    params: GetWalletCollectionsParams
  ): Promise<PaginatedResponse<WalletCollection>> {
    if (!params.address) throw new Error("Wallet address is required");

    return this.nftRepository.getWalletCollections({
      chain: "ronin",
      limit: 25,
      ...params,
    });
  }

  async getWalletTokens(
    params: GetWalletTokensParams
  ): Promise<PaginatedResponse<WalletToken>> {
    if (!params.address) throw new Error("Wallet address is required");

    return this.nftRepository.getWalletTokens({
      chain: "ronin",
      limit: 25,
      ...params,
    });
  }

  async getCollectionNFTs(
    params: GetCollectionNFTsParams
  ): Promise<PaginatedResponse<NFT>> {
    if (!params.address) throw new Error("Wallet address is required");

    return this.nftRepository.getCollectionNFTs({
      chain: "ronin",
      limit: 25,
      ...params,
    });
  }
}

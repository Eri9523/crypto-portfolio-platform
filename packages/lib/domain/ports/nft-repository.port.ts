import { WalletCollection, NFT, WalletToken } from "../entities/wallet";

interface Params {
  address: string;
  limit?: number;
  chain?: string;
  cursor?: string;
}

export interface GetWalletCollectionsParams extends Params {}
export interface GetWalletTokensParams extends Params {}

export interface GetCollectionNFTsParams extends Params {
  collection: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  cursor: string | null;
  hasMore: boolean;
}

export interface NFTRepositoryPort {
  getWalletCollections(
    params: GetWalletCollectionsParams
  ): Promise<PaginatedResponse<WalletCollection>>;
  getWalletTokens(
    params: GetWalletTokensParams
  ): Promise<PaginatedResponse<WalletToken>>;
  getCollectionNFTs(
    params: GetCollectionNFTsParams
  ): Promise<PaginatedResponse<NFT>>;
}

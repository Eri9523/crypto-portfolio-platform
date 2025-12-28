// UI Components
export { DefaultLoading } from "./ui/DefaultLoading";
export { NavBar } from "./ui/NavBar";

// Hooks
export { useWalletCollection } from "./hooks/useWalletCollection";
export { useCollectionNFT } from "./hooks/useCollectionNFT";
export { useWalletTokens } from "./hooks/useWalletTokens";
export { useInfiniteScroll } from "./hooks/useInfiniteScroll"

// Domain Entities
export type {
  WalletCollection,
  NFT,
  WalletToken,
} from "./domain/entities/wallet";

// Domain Services
export { WalletService } from "./domain/services/wallet.service";

// Ports
export type { NFTRepositoryPort } from "./domain/ports/nft-repository.port";

// Infrastructure
export { MoralisAdapter } from "./infrastructure/adapters/moralis.adapter";
export { diContainer } from "./infrastructure/config/di-container";

// Configuration
export type { AppConfig } from "./config/app-config";

// Components
export { CollectionCard } from "./components/CollectionCard";
export { NftCard } from "./components/NftCard";

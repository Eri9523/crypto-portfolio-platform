export interface WalletCollection {
  tokenAddress: string;
  name: string;
  symbol: string;
  contractType: string;
  verified: boolean;
  logo: string;
  banner: string;
  floorPrice: string;
  floorPriceUsd: string
  floorPriceCurrency: string
}

export interface WalletToken {
    tokenAdress: string;
    name: string;
    balance: string;
    balanceUsd: string;
    logo: string;
    banner: string;
}

export interface NFT{
    tokenAddress: string;
    tokenId: string;
    contractType:string;
    name: string;
    symbol: string;
    image: string;
}
import { useEffect, useState } from "react";
import { WalletCollection } from "../domain/entities/wallet";
import { diContainer } from "../infrastructure/config/di-container";

export const useWalletCollection = (
  address: string,
  chain: string = "ronin",
  limit: number = 25
) => {
  const [collections, setCollections] = useState<WalletCollection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      setCollections([]);
      return;
    }
    const fetchCollections = async () => {
      setLoading(true);
      setError(null);

      try {
        const walletService = diContainer.getWalletService();
        const data = await walletService.getWalletCollections({
          address,
          chain,
          limit,
        });
        setCollections(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occured");
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [address, chain, limit]);

  return { collections, loading, error };
};

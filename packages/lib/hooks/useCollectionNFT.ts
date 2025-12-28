import { useEffect, useState, useCallback, useRef } from "react";
import { NFT } from "../domain/entities/wallet";
import { diContainer } from "../infrastructure/config/di-container";

export const useCollectionNFT = (
  address: string,
  collection: string,
  chain: string = "ronin",
  limit: number = 25
) => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const cursorRef = useRef<string | null>(null);

  const fetchNFTs = useCallback(
    async (isLoadMore: boolean = false) => {
      if (!address) {
        setNfts([]);
        return;
      }

      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        cursorRef.current = null;
      }
      setError(null);

      try {
        const walletService = diContainer.getWalletService();
        const response = await walletService.getCollectionNFTs({
          address,
          collection,
          chain,
          limit,
          cursor: isLoadMore ? cursorRef.current || undefined : undefined,
        });

        cursorRef.current = response.cursor;
        setHasMore(response.hasMore);

        if (isLoadMore) {
          setNfts((prev) => [...prev, ...response.data]);
        } else {
          setNfts(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        if (!isLoadMore) {
          setNfts([]);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [address, collection, chain, limit]
  );

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchNFTs(true);
    }
  }, [loadingMore, hasMore, fetchNFTs]);

  useEffect(() => {
    fetchNFTs(false);
  }, [fetchNFTs]);

  return { nfts, loading, loadingMore, error, hasMore, loadMore };
};

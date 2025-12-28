import {
  DefaultLoading,
  useCollectionNFT,
  NftCard,
  useInfiniteScroll,
} from "@monorepo-template/lib";
import { useParams } from "react-router-dom";

export const Component = () => {
  const { address, collection } = useParams();
  if (!address || !collection) {
    return <div>Invalid URL parameters</div>;
  }
  const { nfts, loading, loadingMore, error, hasMore, loadMore } =
    useCollectionNFT(address, collection, "ronin", 28);

  // Infinite scroll hook
  const loadMoreRef = useInfiniteScroll(loadMore, hasMore, loadingMore);

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <DefaultLoading />
      </div>
    );

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 p-4 w-full">
        {nfts.map((nft) => (
          <NftCard key={`${nft.tokenAddress}-${nft.tokenId}`} nft={nft} />
        ))}
      </div>

      {/* Elemento para detectar scroll */}
      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
        {loadingMore && <DefaultLoading />}
      </div>
    </div>
  );
};

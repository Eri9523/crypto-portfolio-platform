import { DefaultLoading, useWalletCollection } from "@monorepo-template/lib";
import { useParams, Link } from "react-router-dom";
import { CollectionCard } from "@monorepo-template/lib";

export const Component = () => {
  const { address } = useParams();
  if (!address) {
    return <div className="text-white text-center">Invalid address</div>;
  }

  const { collections, loading, error } = useWalletCollection(address);

  if (loading)
    return (
      <div className="flex items-center justify-center  h-full">
        <DefaultLoading />
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {collections.map((collection) => {
        return (
          <Link 
            key={collection.tokenAddress} 
            to={`/portfolio/${address}/${collection.tokenAddress}`}
          >
            <CollectionCard collection={collection} />
          </Link>
        );
      })}
    </div>
  );
};

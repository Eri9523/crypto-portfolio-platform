import { NFT } from "../domain/entities/wallet";

const shortenAddress = (address: string) => {
  if (address.length <= 13) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const NftCard = ({
  nft,
}: {
  nft: NFT;
}) => {
  return (
    <div
      className="group bg-gray-800 rounded-lg shadow-lg flex flex-col cursor-pointer"
      style={{
        transition: "transform 300ms ease-out, box-shadow 300ms ease-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Image header con aspect-ratio fijo */}
      <div className="aspect-square w-full bg-gray-600 relative overflow-hidden rounded-t-lg">
        {nft.image ? (
          <img
            src={nft.image}
            alt={nft.name}
            className="absolute inset-0 w-full h-full object-cover z-10 bg-gray-600"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors duration-300" />
      </div>

      {/* Content section */}
      <div className="p-4 flex flex-col gap-1 min-h-0">
        <div
          className="w-full flex justify-between items-center">
          <span className="text-gray-100 text-xs font-mono">
            {shortenAddress(nft.tokenAddress)}
          </span>
          <span className="text-gray-100 text-sm">{nft.symbol}</span>
        </div>

        <p
          className="text-white font-bold text-base sm:text-lg truncate"
          title={nft.name}
        >
          {nft.name}
        </p>
      </div>
    </div>
  );
};

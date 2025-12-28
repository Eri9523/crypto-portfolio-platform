import { SearchBar } from "@monorepo-template/lib/ui/SearchBar";
import { useState } from "react";

export const Component = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <h1 className="text-white text-4xl font-bold text-center mb-2">
        NFT Portfolio Dashboard
      </h1>
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl p-6 shadow-lg w-full max-w-2xl flex flex-col items-center">
        <p className="text-white text-lg text-center mb-2">
          Discover, track, and showcase your NFTs on any Blockchain.
        </p>
        <p className="text-gray-200 text-center mb-4">
          Thousands of NFTs indexed.
          <br />
          Explore trending collections and see what’s new!
        </p>
        <button
          className="bg-white text-purple-700 font-bold px-6 py-2 rounded-lg shadow hover:bg-purple-100 transition"
          onClick={() =>
            (window.location.href =
              "/portfolio/0x03e6a283d0da3d296031268b784bb64ab2ac246e")
          }
        >
          View Demo Portfolio
        </button>
      </div>
      <div className="mt-8 text-gray-400 text-center max-w-xl">
        <h2 className="text-xl font-semibold mb-2">How it works</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>Enter your wallet address in the search bar above</li>
          <li>Browse your NFT collections and assets</li>
          <li>Discover new and trending NFTs on Ronin</li>
        </ol>
      </div>
    </div>
  );
};

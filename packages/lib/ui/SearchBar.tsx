
type SearchBarProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    address: string;
    setAddress: (address: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({handleSubmit, address, setAddress}) => {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter wallet address..."
        className="px-3 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 w-64"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Go
      </button>
    </form>
  );
};

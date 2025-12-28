import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export const NavBar = () => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      navigate(`/portfolio/${address.trim()}`);
      setAddress("");
    }
  };

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <ul className="text-white">
        <a href="/">
          <li>Home</li>
        </a>
      </ul>

      <SearchBar
        handleSubmit={handleSubmit}
        address={address}
        setAddress={setAddress}
      />
    </nav>
  );
};

import { Outlet } from "react-router-dom";
import {NavBar} from "@monorepo-template/lib";

export const Component = () => {
  return (
    <div className="min-h-screen bg-gray-900 grid grid-rows-[auto_1fr_auto]">
      <NavBar />
      <main className="p-8 overflow-auto">
        <Outlet />
      </main>
      <footer className="bg-gray-800 p-4">
        <p className="text-white text-center">© 2025 Portfolio lookup </p>
      </footer>
    </div>
  );
};

export default Component;

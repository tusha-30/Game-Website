// src/components/Topbar.tsx
"use client";

import { useRouter } from "next/navigation";
import { FaHome, FaGamepad, FaChartLine } from "react-icons/fa";

const Topbar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="sticky flex justify-center top-0 bg-gray-800 text-white p-4 shadow-md z-10 ">
      <button
        className="flex items-center space-x-2"
        onClick={() => router.push("/")}
      >
        <FaHome />
        <span>Home Page</span>
      </button>
      <button
        className="flex items-center space-x-2"
        onClick={() => router.push("/game-store")}
      >
        <FaGamepad />
        <span>Game Store</span>
      </button>
      <button
        className="flex items-center space-x-2"
        onClick={() => router.push("/leaderboard")}
      >
        <FaChartLine />
        <span>Leaderboard</span>
      </button>
    </div>
  );
};

export default Topbar;

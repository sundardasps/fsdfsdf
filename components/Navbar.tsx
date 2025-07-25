// components/Navbar.tsx
import Image from "next/image";
import React from "react";

type Theme = "light" | "dark";
interface NavbarProps {
  theme: Theme;
  onThemeToggle: () => void;
  userName: string;
  userAvatar: string;
  onSearch?: (query: string) => void;
  onLogout: () => void; // <-- Add this prop
}

const Navbar: React.FC<NavbarProps> = ({
  theme,
  onThemeToggle,
  userName,
  userAvatar,
  onSearch,
  onLogout,
}) => {
  const [search, setSearch] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(search);
  };

  return (
    <header className={`flex items-center justify-between h-16 w-full px-6 border-b ${theme === "dark" ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
      {/* Left: App Title and Sidebar Toggle (if needed) */}
      <div className="font-bold text-lg">Dashboard</div>

      {/* Center: Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md mx-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full px-4 py-2 rounded border outline-none focus:ring transition ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 border-gray-300"}`}
        />
      </form>

      {/* Right: Theme, User, Logout */}
      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle theme"
          onClick={onThemeToggle}
          type="button"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {/* User */}
        <div className="flex items-center gap-2">
          {/* <Image src={userAvatar} alt={userName} className="w-8 h-8 rounded-full border" /> */}
          <span className="hidden md:inline">{userName}</span>
        </div>
        {/* Logout */}
        <button onClick={onLogout} className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;

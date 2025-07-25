"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { clearUser } from "@/lib/reducers/userSlice";
import { persistor } from "@/lib/store";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(clearUser());
    await persistor.purge();
    await signOut({ callbackUrl: "/auth" });
  };

  return (
    <div
      className={`min-h-screen flex ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Sidebar
        theme={theme}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />

      <div className="flex-1 flex flex-col">
        <Navbar
          theme={theme}
          onThemeToggle={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          userName="John Doe"
          userAvatar="/avatar.jpg"
          onSearch={(query) => console.log("Search:", query)}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

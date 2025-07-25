"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { clearUser } from "@/lib/reducers/userSlice";
import { persistor } from "@/lib/store";
import { signOut } from "next-auth/react";
import Navbar from "./Navbar";

// import { useState } from "react";
// import Sidebar from "@/components/Sidebar"; // adjust path accordingly
// import PersonalizedFeed from "./PersonalizedFeed";
// import TrendingSection from "./TrendingSection";
// import FavoritesSection from "./FavoritesSection";
// import Navbar from "./Navbar";
// import { signOut } from "next-auth/react";
// import { clearUser } from "@/lib/reducers/userSlice";
// import { persistor } from "@/lib/store";
// import { useDispatch } from "react-redux";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [theme, setTheme] = useState<"light" | "dark">("light");
//   const [collapsed, setCollapsed] = useState(false);
//   const [activeSection, setActiveSection] = useState("feed"); // default section
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     dispatch(clearUser());
//     persistor.purge(); // Clears redux-persist storage
//     await signOut({ callbackUrl: "/auth" });
//   };

//   return (
//     <div
//       className={`min-h-screen flex ${
//         theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
//       }`}
//     >
//       <Sidebar
//         theme={theme}
//         activeSection={activeSection}
//         onSelect={setActiveSection}
//         collapsed={collapsed}
//         onToggleCollapse={() => setCollapsed((c) => !c)}
//       />

//       <div className="flex-1 flex flex-col">
//         {/* Your Navbar component can receive theme and a handler to toggle theme */}
//         <Navbar
//           theme={theme}
//           onThemeToggle={() =>
//             setTheme((t) => (t === "light" ? "dark" : "light"))
//           }
//           userName="John Doe"
//           userAvatar="/avatar.jpg"
//           onSearch={(query) => console.log("Search:", query)}
//           onLogout={handleLogout}
//         />

//         <main className="flex-1 p-6 overflow-auto">
//           {activeSection === "feed" && <PersonalizedFeed />}
//           {activeSection === "trending" && <TrendingSection />}
//           {activeSection === "favorites" && <FavoritesSection />}
//         </main>
//       </div>
//     </div>
//   );
// }
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(clearUser());
    await persistor.purge(); // clear persisted storage
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


// "use client";

// import React from "react";
// import { Newspaper, ChartAreaIcon, Star } from "lucide-react";
// import { usePathname } from "next/navigation";

// interface SidebarItem {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
// }

// interface SidebarProps {
//   theme: "light" | "dark";
//   activeSection: string; // e.g., "feed", "trending", "favorites"
//   onSelect: (id: string) => void;
//   collapsed?: boolean;
//   onToggleCollapse?: () => void;
// }

// // const navItems: SidebarItem[] = [
// //   { id: "feed", label: "Personalized Feed", icon: <Newspaper /> },
// //   { id: "trending", label: "Trending", icon: <ChartAreaIcon /> },
// //   { id: "favorites", label: "Favorites", icon: <Star /> },
// // ];

// const pathname = usePathname();

//   const navItems = [
//     { id: "feed", label: "Personalized Feed", href: "/dashboard/feed", icon: <Newspaper /> },
//     { id: "trending", label: "Trending", href: "/dashboard/trending", icon: <ChartAreaIcon /> },
//     { id: "favorites", label: "Favorites", href: "/dashboard/favorites", icon: <Star /> },
//   ];

// export default function Sidebar({
//   theme,
//   activeSection,
//   onSelect,
//   collapsed = false,
//   onToggleCollapse,
// }: SidebarProps) {
//   return (
//     <aside
//       className={`
//         flex flex-col
//         ${collapsed ? "w-16" : "w-56"}
//         h-screen
//         border-r
//         transition-width duration-300
//         ${
//           theme === "dark"
//             ? "bg-gray-900 border-gray-700 text-gray-200"
//             : "bg-white border-gray-200 text-gray-900"
//         }
//       `}
//     >
//       {/* Header / Collapse Toggle */}
//       <div className="flex items-center justify-between h-16 px-4 border-b border-gray-300 dark:border-gray-700">
//         {!collapsed && <div className="font-bold text-xl">Dashboard</div>}
//         <button
//           onClick={onToggleCollapse}
//           aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//           className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//           type="button"
//         >
//           {collapsed ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               {/* Right Arrow */}
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               {/* Left Arrow */}
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Navigation Items */}
//       <nav className="flex-1 overflow-y-auto">
//         <ul className="py-2">
//           {navItems.map(({ id, label,href, icon }) => {
//             const isActive = pathname  === href;
//             return (
//               <li key={id} className="px-1">
//                 <button
//                   onClick={() => onSelect(id)}
//                   className={`
//                     w-full flex items-center gap-4 py-3 px-5 rounded
//                     transition-colors duration-200
//                     ${
//                       isActive
//                         ? theme === "dark"
//                           ? "bg-blue-600 text-white"
//                           : "bg-blue-100 text-blue-700"
//                         : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
//                     }
//                     ${collapsed ? "justify-center" : ""}
//                   `}
//                   type="button"
//                 >
//                   <div className="text-lg">{icon}</div>
//                   {!collapsed && <span className="truncate">{label}</span>}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//     </aside>
//   );
// }

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Newspaper, ChartAreaIcon, Star } from "lucide-react";

export default function Sidebar({ theme, collapsed, onToggleCollapse }) {
  const pathname = usePathname();

  const navItems = [
    {
      id: "feed",
      label: "Personalized Feed",
      href: "/dashboard/feed",
      icon: <Newspaper />,
    },
    {
      id: "trending",
      label: "Trending",
      href: "/dashboard//trending",
      icon: <ChartAreaIcon />,
    },
    { id: "favorites", label: "Favorites", href: "/dashboard/favorites", icon: <Star /> },
  ];

  return (
    <aside
      className={`
        flex flex-col
        ${collapsed ? "w-16" : "w-56"}
        h-screen
        border-r
        transition-width duration-300
        ${
          theme === "dark"
            ? "bg-gray-900 border-gray-700 text-gray-200"
            : "bg-white border-gray-200 text-gray-900"
        }
      `}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-300 dark:border-gray-700">
        {!collapsed && <div className="font-bold text-xl">Dashboard</div>}
        <button
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          type="button"
        >
          {/* Toggle icon here, same as before */}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-2">
          {navItems.map(({ id, label, href, icon }) => {
            const isActive = pathname === href;
            return (
              <li key={id} className="px-1">
                <Link
                  href={href}
                  className={`
                      flex items-center gap-4 py-3 px-5 rounded
                      transition-colors duration-200
                      ${
                        isActive
                          ? theme === "dark"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                      }
                      ${collapsed ? "justify-center" : ""}
                    `}
                >
                  <div className="text-lg">{icon}</div>
                  {!collapsed && <span className="truncate">{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

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
      href: "/dashboard/trending",
      icon: <ChartAreaIcon />,
    },
    {
      id: "favorites",
      label: "Favorites",
      href: "/dashboard/favorites",
      icon: <Star />,
    },
  ];

  return (
    <div className="relative group flex">
      {" "}
      {/* Wrapper with group and flex layout */}
      {/* Main Sidebar */}
      <aside
        className={`
          flex flex-col
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
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-300 dark:border-gray-700"></div>
        <nav className="flex flex-col items-center py-4 space-y-6">
          {navItems.map(({ id, href, icon }) => (
            <Link
              key={id}
              href={href}
              className="w-12 h-12 flex items-center justify-center rounded-md ..."
            >
              {icon}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Absolute label panel */}
      <div
        className={`
          absolute top-0 left-full ml-0 h-full min-w-[8rem] rounded-md shadow-lg
          bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200
          opacity-0 pointer-events-none -translate-x-4
          transition-all duration-300 ease-in-out
          group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0
          flex flex-col py-4
          z-30
          border border-gray-200 dark:border-gray-700
        `}
      >
         <div className="flex items-center justify-between h-16 px-4 border-b border-gray-300 dark:border-gray-700"></div>
        <ul className="flex flex-col space-y-6 px-2">
          {navItems.map(({ id, label, href }) => (
            <li key={id}>
              <Link
                href={href}
                className="block px-4 py-2 rounded-md whitespace-nowrap hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

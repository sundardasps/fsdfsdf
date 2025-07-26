import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Newspaper, ChartAreaIcon, Star } from "lucide-react";
import { Fragment, useState } from "react";

export default function Sidebar({ theme }) {
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = useState([]); // initialize as empty array

  const navItems = [
    {
      id: "feed",
      label: "Feed",
      href: "/dashboard/feed",
      icon: <Newspaper />,
      subItems: [
        { label: "News", href: "/dashboard/feed" },
        { label: "Recommendations", href: "/dashboard/feed/recommendations" },
        { label: "Social", href: "/dashboard/feed/social" },
      ],
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

  const handleSelect = (item) => {
    if (item.subItems) {
      setSelected(item.subItems);
    } else {
      // Use Next.js router navigation instead of window.location
      router.push(item.href);
      setSelected([]); // clear selected submenu if any
    }
  };

  // Optionally clear submenu when mouse leaves the sidebar area
  const handleMouseLeave = () => {
    setSelected([]);
  };

  return (
    <div
      className="relative group flex"
      onMouseLeave={handleMouseLeave} // hide submenu when mouse leaves wrapper
    >
      {/* Main Sidebar */}
      <aside
        className={`
          flex flex-col p-2
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
          {navItems.map(({ id, icon, label, href }) => {
            const isActive =
              pathname === href ||
              (navItems
                .find((n) => n.id === id)
                ?.subItems?.some((sub) => sub.href === pathname) ??
                false);

            return (
              <div key={id} className="felx flex-col text-center  ">
                <div
                  className={`
                  w-12 h-12 flex items-center justify-center rounded-md cursor-pointer mb-1 
                  ${
                    isActive
                      ? theme === "dark"
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                  }
                `}
                  onMouseEnter={() =>
                    handleSelect(navItems.find((n) => n.id === id))
                  }
                >
                  {icon}
                </div>
                <p
                  className={`text-[8px] font-semibold ${
                    isActive
                      ? theme === "dark"
                        ? " text-white"
                        : " text-blue-700"
                      : "text-gray-600   dark:text-gray-300"
                  }`}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Absolute label panel for subItems */}
      <div
        className={`
          absolute  top-0 left-full ml-0 h-full min-w-[8rem] rounded-md shadow-lg
          bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200
          transition-all duration-300 ease-in-out
          flex flex-col py-4
          z-30
          border border-gray-200 dark:border-gray-700
          ${
            selected.length > 0
              ? "opacity-100 pointer-events-auto translate-x-0"
              : "opacity-0 pointer-events-none -translate-x-4"
          }
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-300 dark:border-gray-700 font-semibold">
          Submenu
        </div>
        <ul className="flex flex-col space-y-6 px-2">
          {selected.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="block px-4 py-2 rounded-md whitespace-nowrap hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setSelected([])} // close submenu on click
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

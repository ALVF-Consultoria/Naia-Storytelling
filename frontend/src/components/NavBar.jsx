import { Link, useLocation } from "react-router-dom";
import { Globe, Menu, X, BookAIcon } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/create-history", label: "Create Story" },
    { to: "/stories-page", label: "My Stories", icon: <BookAIcon size={16} /> },
  ];

  const isHome = location.pathname === "/";

  const linkClasses = (to) =>
    `flex items-center gap-1 px-3 py-2 rounded-md font-medium transition-all duration-300 ${location.pathname === to
      ? "text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-white/10"
      : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-300 hover:bg-gray-100 dark:hover:bg-white/5"
    }`;

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 border-b ${isHome
      ? "bg-transparent border-transparent"
      : "bg-white/80 dark:bg-[#0a0a1a]/80 backdrop-blur-md border-gray-200 dark:border-blue-500/20 shadow-sm"
      }`}>
      <div className="container mx-auto flex justify-between items-center h-20 px-6">
        {/* LOGO */}
        {!isHome ? (
          <Link
            to="/"
            className="flex items-center text-xl font-bold opacity-0 animate-fadeIn"
            style={{ animationFillMode: 'forwards' }}
            onClick={() => setIsOpen(false)}
          >
            <img
              src="/imgs/logos/naia-logo-curto-reduzida.png"
              alt="NAIA Logo"
              className="w-12 h-12 hover:scale-110 transition-transform duration-300"
            />
          </Link>
        ) : (
          <div /> /* Placeholder to keep menu on the right */
        )}

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link key={link.label} to={link.to} className={linkClasses(link.to)}>
              {link.icon && <span className="text-blue-500 mr-1.5">{link.icon}</span>}
              {link.label}
            </Link>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        {!isHome && (
          <button
            className="md:hidden text-gray-700 dark:text-white hover:text-blue-600 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </div>

      {/* MOBILE MENU */}
      {isOpen && !isHome && (
        <div className="md:hidden bg-white/95 dark:bg-[#0a0a1a]/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 shadow-lg flex flex-col px-6 py-4 space-y-3 absolute w-full left-0 top-20">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={linkClasses(link.to)}
            >
              {link.icon && <span className="text-blue-500 dark:text-blue-400 mr-2">{link.icon}</span>}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;

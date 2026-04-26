import { Link, useLocation } from "react-router-dom";
import { Globe, Menu, X, BookAIcon, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import DeleteAccountModal from "./DeleteAccountModal";
import LanguageToggle from "./LanguageToggle";

const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isLogoFocused, user, logout } = useAuth();
  const { t } = useTranslation();

  const links = [
    { to: "/", label: t('navbar.home') },
    { to: "/create-history", label: t('navbar.create') },
    { to: "/stories-page", label: t('navbar.library'), icon: <BookAIcon size={16} /> },
  ];

  const isHome = location.pathname === "/";
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClasses = (to) =>
    `flex items-center gap-1 px-3 py-2 rounded-md font-medium transition-all duration-300 ${location.pathname === to
      ? "text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-white/10"
      : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-300 hover:bg-gray-100 dark:hover:bg-white/5"
    }`;

  return (
    <nav className="w-full fixed top-0 left-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-muted/10">
      <div className="container mx-auto flex justify-between items-center h-20 px-6">
        {/* LOGO */}
        {!isHome && (!isAuthPage || !isLogoFocused) ? (
          <Link
            to="/"
            className="flex items-center text-xl font-bold"
            style={{ animationFillMode: 'forwards' }}
            onClick={() => setIsOpen(false)}
          >
            <Motion.img
              layoutId="main-logo"
              src="/imgs/logos/naia-logo-curto-reduzida.png"
              alt="NAIA Logo"
              className="w-12 h-12 hover:scale-110 transition-transform duration-300"
            />
          </Link>
        ) : (
          <div className="w-12 h-12" /> /* Placeholder to keep layout spacing */
        )}

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6 ml-auto">
          {links.map((link) => (
            <Link key={link.label} to={link.to} className={linkClasses(link.to)}>
              {link.icon && <span className="text-blue-500 mr-1.5">{link.icon}</span>}
              {link.label}
            </Link>
          ))}

          {/* Language Toggle */}
          <div className="border-r border-muted/20 pr-6 mr-2 flex items-center h-8">
            <LanguageToggle />
          </div>

          {/* User Profile Area */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-surface border border-muted/30 hover:border-accent transition-all shadow-md group"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-magic to-accent flex items-center justify-center text-white font-bold text-xs shadow-lg">
                  {user.username?.[0]?.toUpperCase() || "?"}
                </div>
                <ChevronDown size={14} className="text-secondary transition-transform duration-300 group-hover:text-accent" style={{ transform: isProfileOpen ? 'rotate(180deg)' : 'none' }} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <Motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-64 bg-surface rounded-2xl shadow-2xl border border-muted/10 overflow-hidden backdrop-blur-xl"
                  >
                    {/* User Info */}
                    <div className="p-5 bg-surface-light/50 border-b border-muted/10 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-magic to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {user.username?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-primary truncate">{user.username}</p>
                        <p className="text-xs text-muted truncate">{user.email}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-secondary hover:bg-surface-light rounded-xl transition-colors"
                      >
                        <Settings size={18} className="text-muted" />
                        Configurações
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                      >
                        <LogOut size={18} />
                        Sair
                      </button>
                    </div>
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            !isAuthPage && (
              <Link to="/login" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-600/20">
                Entrar
              </Link>
            )
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        {!isHome && (
          <div className="flex items-center gap-4">
            {user && (
              <div className="md:hidden w-8 h-8 rounded-full bg-linear-to-br from-magic to-accent flex items-center justify-center text-white font-bold text-xs shadow-md">
                {user.username?.[0]?.toUpperCase() || "?"}
              </div>
            )}
            <button
              className="md:hidden text-primary hover:text-accent transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        )}
      </div>

      {/* MOBILE MENU */}
      {isOpen && !isHome && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-muted/10 shadow-lg flex flex-col px-6 py-4 space-y-3 absolute w-full left-0 top-20">
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
          
          <div className="py-2 flex justify-center border-b border-muted/10">
             <LanguageToggle />
          </div>

          {user ? (
            <>
              <div className="h-px bg-gray-200 dark:bg-white/10 my-2" />
              <button
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 rounded-md font-medium"
              >
                <Settings size={18} className="text-blue-500" />
                Configurações
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md font-medium"
              >
                <LogOut size={18} />
                Sair
              </button>
            </>
          ) : (
            !isAuthPage && (
              <Link to="/login" onClick={() => setIsOpen(false)} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-center">
                Entrar
              </Link>
            )
          )}
        </div>
      )}

      {/* MODALS */}
      <DeleteAccountModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
    </nav>
  );
};

export default NavBar;

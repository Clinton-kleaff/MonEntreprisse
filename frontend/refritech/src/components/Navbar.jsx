import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, UserPlus, Home, Briefcase, Info, Mail, Rocket, User, LogOut, ChevronDown, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/services", label: "Services", icon: Briefcase },
  { to: "/sectors", label: "Secteurs", icon: Target },  
  { to: "/about", label: "À propos", icon: Info },
  { to: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const profileDropdownRef = useRef(null);

  const closeMenu = () => setIsOpen(false);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  // Get user's initial for avatar
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Flex on mobile/tablet, grid on laptop for proper alignment */}
          <div className="flex justify-between items-center h-16 lg:grid lg:grid-cols-3">
            {/* Left: Logo */}
            <div className="justify-self-start">
              <Link to="/" className="text-2xl font-bold text-[#d81b60]">
                WaGradeTech
              </Link>
            </div>

            {/* Center: Nav links – visible only on laptops (≥1024px) */}
            <div className="hidden lg:flex justify-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`whitespace-nowrap text-gray-700 hover:text-[#d81b60] transition ${
                    location.pathname === link.to ? "text-[#d81b60] font-semibold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right: Buttons (laptop) + mobile menu button (tablet/phone) */}
            <div className="justify-self-end flex items-center gap-4">
              {/* Laptop buttons */}
              <div className="hidden lg:flex gap-4">
                <Link
                  to="/order"
                  className="bg-[#d81b60] text-white px-4 py-2 rounded-lg hover:bg-[#c2185b] transition"
                >
                  Démarrer un projet
                </Link>

                {/* Conditional authentication button */}
                {user ? (
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      onClick={toggleProfile}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:border-[#d81b60] transition group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#d81b60]/10 flex items-center justify-center text-[#d81b60] font-semibold">
                        {userInitial}
                      </div>
                      <span className="text-sm text-gray-700 hidden md:inline-block max-w-[100px] truncate">
                        {user.name || user.email}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform duration-200 ${
                          isProfileOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20"
                        >
                          <div className="py-2">
                            <div className="px-4 py-2 border-b border-gray-100">
                              <p className="text-xs text-gray-500">Connecté en tant que</p>
                              <p className="text-sm font-medium text-gray-800 truncate">{user.email}</p>
                            </div>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 hover:text-[#d81b60] transition"
                            >
                              <LogOut size={16} />
                              <span>Se déconnecter</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                  >
                    <UserPlus size={18} />
                  </Link>
                )}
              </div>

              {/* Enhanced Hamburger button – modern with subtle border & shadow */}
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden relative p-2 rounded-full bg-white border border-[#d81b60] shadow-sm hover:shadow-md hover:border-[#d81b60]/70 transition-all duration-300"
                aria-label="Ouvrir le menu"
              >
                <Menu size={22} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Premium Sidebar for tablets & phones (below 1024px) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
              onClick={closeMenu}
            />

            {/* Sidebar card */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden border-l-4 border-[#d81b60] rounded-l-2xl overflow-hidden"
            >
              {/* Header with enterprise name and close button */}
              <div className="relative bg-gradient-to-r from-[#d81b60]/5 to-white px-6 pt-8 pb-4 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-[#d81b60]">WaGradeTech</h2>
                    <p className="text-xs text-gray-400 mt-1">Solutions digitales modernes</p>
                  </div>
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition text-gray-500"
                    aria-label="Fermer le menu"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Navigation links with icons and active state */}
              <div className="flex flex-col px-6 py-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={closeMenu}
                      className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-[#d81b60]/10 text-[#d81b60] font-semibold shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#d81b60]"
                      }`}
                    >
                      <Icon size={20} className={`${isActive ? "text-[#d81b60]" : "text-gray-400 group-hover:text-[#d81b60]"}`} />
                      <span className="text-base">{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-[#d81b60]"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Action buttons with premium styling */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white to-transparent pt-12">
                <div className="space-y-3">
                  <Link
                    to="/order"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 w-full bg-[#d81b60] text-white font-semibold py-3 rounded-xl hover:bg-[#c2185b] transition shadow-md shadow-[#d81b60]/20"
                  >
                    <Rocket size={18} />
                    Démarrer un projet
                  </Link>

                  {user ? (
                    <>
                      <div className="flex items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#d81b60]/10 flex items-center justify-center text-[#d81b60] font-semibold">
                            {userInitial}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{user.name || user.email}</p>
                            <p className="text-xs text-gray-400">Connecté</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            handleLogout();
                            closeMenu();
                          }}
                          className="p-2 rounded-lg text-gray-500 hover:text-[#d81b60] hover:bg-white transition"
                        >
                          <LogOut size={18} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 w-full border border-gray-200 text-gray-700 py-3 rounded-xl hover:border-[#d81b60] hover:text-[#d81b60] transition bg-white"
                    >
                      <UserPlus size={18} />
                      Se Connecter
                    </Link>
                  )}
                </div>
                <p className="text-center text-xs text-gray-400 mt-6">
                  © {new Date().getFullYear()} WaGradeTech
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Memoized navigation links
    const menuLinks = useMemo(() => [
        { href: "/Dashboard", label: "Dashboard" },
        { href: "/upload", label: "Upload" },
        { href: "/profile", label: "Profile" },
    ], []);

    const publicLinks = useMemo(() => [
        { href: "/about", label: "About Us" },
        { href: "/services", label: "Services" },
        { href: "/contact", label: "Contact" },
    ], []);

    // Secure token validation
    const validateToken = useCallback((token) => {
        if (!token || typeof token !== 'string') return false;
        
        try {
            // Basic token format validation (adjust based on your token structure)
            const parts = token.split('.');
            if (parts.length !== 3) return false;
            
            // Check if token is expired (if JWT)
            const payload = JSON.parse(atob(parts[1]));
            if (payload.exp && Date.now() >= payload.exp * 1000) {
                localStorage.removeItem("token");
                return false;
            }
            
            return true;
        } catch (error) {
            console.error("Token validation error:", error);
            localStorage.removeItem("token");
            return false;
        }
    }, []);

    // Initialize auth state
    useEffect(() => {
    const checkAuth = () => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(token ? validateToken(token) : false);
        setIsLoading(false)
    }

    // Initial check
    checkAuth();

    // Listen for login/logout events
    window.addEventListener("login", checkAuth);
    window.addEventListener("logout", checkAuth);

    return () => {
        window.removeEventListener("login", checkAuth);
        window.removeEventListener("logout", checkAuth);
    }
}, [validateToken]);


    // Optimized navigation handler
    const handleLinkClick = useCallback((href) => {
        try {
            navigate(href);
            setMenuOpen(false);
        } catch (error) {
            console.error("Navigation error:", error);
        }
    }, [navigate]);

    // Secure logout handler
   const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("logout")); // notify Navbar
    navigate("/", { replace: true });
}, [navigate]);


    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen && !event.target.closest('header')) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [navigate]);

    // Memoized navigation links component
    const NavLinks = useMemo(() => ({ links, mobile = false }) => (
        <>
            {links.map((link, index) => (
                <motion.button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={mobile 
                        ? "w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                        : "text-gray-700 hover:text-indigo-600 transition-colors relative group bg-transparent border-none font-medium cursor-pointer"
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    {...(mobile && {
                        initial: { opacity: 0, x: -20 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: index * 0.1 }
                    })}
                >
                    {link.label}
                    {!mobile && (
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                    )}
                </motion.button>
            ))}
        </>
    ), [handleLinkClick]);

    if (isLoading) {
        return (
            <header className="bg-white shadow-sm px-4 md:px-10 py-3 z-50 fixed top-0 left-0 right-0">
                <div className="flex justify-between items-center">
                    <div className="h-10 w-48 bg-gray-200 animate-pulse rounded"></div>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-white shadow-sm px-4 md:px-10 py-3 z-50 fixed top-0 left-0 right-0">
            <div className="flex justify-between items-center">
                {/* Logo - Preserved original style */}
                <Link to="/" className="relative inline-block">
                    <motion.div
                        className="flex items-center justify-around space-x-3 cursor-pointer group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <motion.div
                            className="relative w-12 h-10 flex items-center justify-center"
                            whileHover={{ rotate: 6 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-cyan-400 rounded-xl transform rotate-12 opacity-80 group-hover:opacity-100 transition-all duration-300"></div>
                            <div className="absolute inset-0.5 bg-black rounded-xl"></div>
                            <motion.div
                                className="relative z-10 text-white font-black text-lg"
                                animate={{
                                    textShadow: [
                                        "0 0 5px rgba(99, 102, 241, 0.5)",
                                        "0 0 10px rgba(139, 92, 246, 0.8)",
                                        "0 0 5px rgba(99, 102, 241, 0.5)",
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <img src={logo} alt="StudyVault Logo" className="rounded-full" />
                            </motion.div>
                            <motion.div
                                className="absolute inset-0 border-2 border-indigo-400/30 rounded-xl"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>

                        <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <motion.span className="text-xl font-bold tracking-tight leading-none select-none bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                                StudyVault
                            </motion.span>
                            <motion.span
                                className="text-xs font-medium text-gray-400 tracking-wider"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                NerathiX
                            </motion.span>
                        </motion.div>
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1 items-center justify-center relative">
                    <div className="flex space-x-6">
                        <NavLinks links={isLoggedIn ? menuLinks : publicLinks} />
                    </div>

                    <div className="absolute right-0">
                        {isLoggedIn ? (
                            <motion.button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-all shadow-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </motion.button>
                        ) : (
                            <motion.button
                                onClick={() => handleLinkClick("/login")}
                                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <LogIn className="w-4 h-4" />
                                Login
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    whileTap={{ scale: 0.95 }}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    <AnimatePresence mode="wait">
                        {menuOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-6 h-6" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu className="w-6 h-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden border-t border-gray-200 mt-3"
                        aria-label="Mobile navigation"
                    >
                        <div className="pt-4 pb-2 space-y-2">
                            <NavLinks links={isLoggedIn ? menuLinks : publicLinks} mobile />
                            
                            {isLoggedIn ? (
                                <motion.button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors mt-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </motion.button>
                            ) : (
                                <motion.button
                                    onClick={() => handleLinkClick("/login")}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all mt-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <LogIn className="w-4 h-4" />
                                    Login
                                </motion.button>
                            )}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../contexts/AuthContext"
import { useTheme } from "../../contexts/ThemeContext"
import Logo from "./Logo"
import LanguageSwitcher from "./LanguageSwitcher"
import ThemeToggle from "./ThemeToggle"
import { UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

const Navbar = ({ toggleSidebar }) => {
  const { t } = useTranslation()
  const { isAuthenticated, user, logout } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll position for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Log theme status to debug
  useEffect(() => {
    console.log("Theme status:", theme)
  }, [theme])

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
      setUserMenuOpen(false)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Check if a navigation item is active
  const isActive = (path) => {
    if (path === "/") return location.pathname === path
    return location.pathname.startsWith(path)
  }

  // Navigation items - removed "Home"
  const navItems = [
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md" : "bg-white dark:bg-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">QuizForm</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>

          {/* Right side: Nav Items, Theme, Language, Auth */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Navigation Items */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Theme and Language controls */}
            <ThemeToggle />
            <LanguageSwitcher className="text-gray-700 dark:text-gray-300" />

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span className="hidden sm:block font-medium">{user?.name || user?.email}</span>
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </button>

                {/* User dropdown menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      {t("nav.profile")}
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        {t("nav.admin")}
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {t("nav.logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-md px-4 py-2"
                >
                  {t("nav.register")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? "text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={toggleMobileMenu}
              >
                {item.name}
              </Link>
            ))}

            {/* Add theme toggle and language switcher to mobile menu */}
            <div className="flex items-center space-x-4 px-3 py-2">
              <ThemeToggle />
              <LanguageSwitcher className="text-gray-700 dark:text-gray-300" />
            </div>

            {!isAuthenticated && (
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={toggleMobileMenu}
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={toggleMobileMenu}
                >
                  {t("nav.register")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar


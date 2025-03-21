"use client"
import PropTypes from "prop-types"
import Header from "./Header"
import Footer from "./Footer"
import { useTheme } from "../../contexts/ThemeContext"

/**
 * Main Layout component that wraps all pages
 * Adapted for Next.js
 */
const Layout = ({ children }) => {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "dark" : ""}`}>
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout


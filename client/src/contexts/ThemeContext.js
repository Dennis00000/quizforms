"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  // Initialize from localStorage or system preference
  const getInitialTheme = () => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        return savedTheme
      }
      // Check system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark"
      }
    }
    return "light" // default theme
  }

  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    // Update localStorage
    localStorage.setItem("theme", theme)

    // Update document classes for Tailwind dark mode
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)

    // Update data-theme attribute for custom CSS
    document.body.setAttribute("data-theme", theme)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (!localStorage.getItem("theme")) {
        setTheme(mediaQuery.matches ? "dark" : "light")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export default ThemeContext


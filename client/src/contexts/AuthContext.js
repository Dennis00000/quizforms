"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const isAuthenticated = !!session
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role || "user",
        image: session.user.image,
      })
    } else {
      setUser(null)
    }
  }, [session])

  const login = async (email, password) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result.error) {
        throw new Error(result.error)
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      // Make API call to register user
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      // Auto login after registration
      return login(userData.email, userData.password)
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  const forgotPassword = async (email) => {
    try {
      // Make API call to initiate password reset
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email")
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const resetPassword = async (token, password) => {
    try {
      // Make API call to reset password
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password")
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


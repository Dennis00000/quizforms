"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../contexts/AuthContext"
import { FaGoogle, FaGithub } from "react-icons/fa"
import { toast } from "react-hot-toast"

/**
 * Component that renders OAuth login buttons
 */
const OAuthButtons = () => {
  const { t } = useTranslation()
  const { loginWithGoogle, loginWithGithub } = useAuth()
  const [isLoading, setIsLoading] = useState({
    google: false,
    github: false,
  })

  const handleGoogleLogin = async (e) => {
    e.preventDefault()
    setIsLoading((prev) => ({ ...prev, google: true }))
    try {
      const result = await loginWithGoogle()
      if (!result.success) {
        toast.error("Could not connect to Google")
      }
    } catch (error) {
      toast.error("Failed to sign in with Google")
    } finally {
      setIsLoading((prev) => ({ ...prev, google: false }))
    }
  }

  const handleGithubLogin = async (e) => {
    e.preventDefault()
    setIsLoading((prev) => ({ ...prev, github: true }))
    try {
      const result = await loginWithGithub()
      if (!result.success) {
        toast.error("Could not connect to GitHub")
      }
    } catch (error) {
      toast.error("Failed to sign in with GitHub")
    } finally {
      setIsLoading((prev) => ({ ...prev, github: false }))
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading.google}
        className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading.google ? (
          <div className="w-5 h-5 border-t-2 border-b-2 border-current rounded-full animate-spin mr-3" />
        ) : (
          <FaGoogle className="w-5 h-5 text-red-500 mr-3" />
        )}
        Continue with Google
      </button>

      <button
        onClick={handleGithubLogin}
        disabled={isLoading.github}
        className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading.github ? (
          <div className="w-5 h-5 border-t-2 border-b-2 border-current rounded-full animate-spin mr-3" />
        ) : (
          <FaGithub className="w-5 h-5 text-gray-900 dark:text-white mr-3" />
        )}
        Continue with GitHub
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">or use email</span>
        </div>
      </div>
    </div>
  )
}

export default OAuthButtons


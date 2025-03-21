"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"
import { useTranslation } from "react-i18next"

/**
 * Page that handles OAuth redirects and other authentication callbacks
 */
const AuthCallbackPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        // Check if we're coming back from an OAuth redirect
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (data?.session) {
          // User is authenticated, redirect to home page
          console.log("Authenticated via OAuth, redirecting to home")
          navigate("/")
        } else {
          // No session found, this might be another type of auth callback
          // like email confirmation
          console.log("No session found in callback, handling as email confirmation")

          // Try to exchange the token if there's one in the URL
          const hash = window.location.hash.substring(1)
          const query = new URLSearchParams(hash || window.location.search)

          // Check for error in the URL parameters
          if (query.get("error")) {
            const errorDescription = query.get("error_description") || "Authentication failed"
            throw new Error(errorDescription)
          }

          if (query.get("type") === "recovery") {
            // This is a password reset callback
            navigate("/reset-password")
            return
          }

          // If no specific action is detected, redirect to login
          navigate("/login")
        }
      } catch (error) {
        console.error("Error handling auth callback:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    handleAuthRedirect()
  }, [navigate])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t("auth.callback.processing", "Processing your authentication...")}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {t("auth.callback.wait", "Please wait, you will be redirected shortly.")}
            </p>
          </div>
        ) : error ? (
          <div className="text-center">
            <div className="rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 bg-red-100 dark:bg-red-900/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t("auth.callback.error", "Authentication Error")}
            </h2>
            <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {t("auth.callback.returnToLogin", "Return to Login")}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default AuthCallbackPage


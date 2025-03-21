"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../config/supabaseClient"
import { toast } from "react-hot-toast"

const OAuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session immediately
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Session error:", error)
          toast.error("Authentication failed")
          navigate("/login")
          return
        }

        if (session) {
          toast.success("Successfully signed in!")
          navigate("/dashboard")
          return
        }

        // If no session, check for hash fragment
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get("access_token")

        if (accessToken) {
          // Set the session with the access token
          const { error: setSessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: hashParams.get("refresh_token"),
          })

          if (setSessionError) {
            throw setSessionError
          }

          toast.success("Successfully signed in!")
          navigate("/dashboard")
        } else {
          // No session or access token found
          toast.error("Authentication failed")
          navigate("/login")
        }
      } catch (error) {
        console.error("Auth callback error:", error)
        toast.error("Authentication failed")
        navigate("/login")
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex items-center space-x-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-gray-600 dark:text-gray-400">Completing sign in...</p>
      </div>
    </div>
  )
}

export default OAuthCallback


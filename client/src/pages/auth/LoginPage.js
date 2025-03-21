"use client"

import { useState } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../contexts/AuthContext"
import { FaGoogle, FaGithub } from "react-icons/fa"

const LoginPage = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loginWithGoogle, loginWithGitHub } = useAuth()

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || t("auth.errors.loginFailed", "Failed to sign in"))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (loginWithGoogle) {
        await loginWithGoogle()
        navigate(from, { replace: true })
      }
    } catch (err) {
      setError(err.message || t("auth.errors.googleLoginFailed", "Failed to sign in with Google"))
    } finally {
      setLoading(false)
    }
  }

  const handleGitHubLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (loginWithGitHub) {
        await loginWithGitHub()
        navigate(from, { replace: true })
      }
    } catch (err) {
      setError(err.message || t("auth.errors.githubLoginFailed", "Failed to sign in with GitHub"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center">
                <span className="text-gray-500 dark:text-gray-400 absolute left-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10 appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-lg"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center">
                <span className="text-gray-500 dark:text-gray-400 absolute left-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-10 appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <Link
              to="/forgot-password"
              className="text-md font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 block text-center"
            >
              Forgot Password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? t("common.loading", "Loading...") : "Login"}
            </button>
          </div>

          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute border-t border-gray-300 dark:border-gray-600 w-full"></div>
            <div className="relative px-4 bg-white dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">OR</div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="p-3 rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              aria-label="Sign in with Google"
            >
              <FaGoogle className="h-6 w-6 text-red-500" />
            </button>

            <button
              onClick={handleGitHubLogin}
              type="button"
              className="p-3 rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              aria-label="Sign in with GitHub"
            >
              <FaGithub className="h-6 w-6 text-gray-800 dark:text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage


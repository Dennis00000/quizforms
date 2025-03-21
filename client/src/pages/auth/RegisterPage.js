"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../contexts/AuthContext"
import { FaGoogle, FaGithub } from "react-icons/fa"

const RegisterPage = () => {
  const { t } = useTranslation()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const navigate = useNavigate()
  const { register, loginWithGoogle, loginWithGitHub } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset previous messages
    setError("")
    setSuccessMessage("")

    // Validate form inputs
    if (!name.trim()) {
      return setError(t("auth.validation.nameRequired", "Please enter your name"))
    }

    if (!email.trim()) {
      return setError(t("auth.validation.emailRequired", "Please enter your email"))
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return setError(t("auth.validation.emailInvalid", "Please enter a valid email address"))
    }

    if (!password) {
      return setError(t("auth.validation.passwordRequired", "Please enter a password"))
    }

    if (password !== confirmPassword) {
      return setError(t("auth.validation.passwordMatch", "Passwords do not match"))
    }

    if (password.length < 6) {
      return setError(t("auth.validation.passwordLength", "Password must be at least 6 characters"))
    }

    setLoading(true)

    try {
      console.log("Submitting registration form with:", { email, name })
      const result = await register(email, password, name)

      if (result.success) {
        setSuccessMessage(
          t("auth.register.success", "Registration successful! Please check your email to confirm your account."),
        )
        // Clear form fields on success
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")

        // Delay navigation to allow user to see success message
        setTimeout(() => {
          navigate("/login")
        }, 3000)
      } else {
        setError(result.error || t("auth.register.error", "Failed to create account"))
      }
    } catch (err) {
      console.error("Error in RegisterPage submit handler:", err)
      setError(err.message || t("auth.register.error", "Failed to create account"))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = (e) => {
    e.preventDefault()
    if (loginWithGoogle) {
      loginWithGoogle()
    }
  }

  const handleGitHubLogin = (e) => {
    e.preventDefault()
    if (loginWithGitHub) {
      loginWithGitHub()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center">
                <span className="text-gray-500 dark:text-gray-400 absolute left-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="pl-10 appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-lg"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  required
                  className="pl-10 appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="pl-10 appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-lg"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? t("common.loading", "Loading...") : "Create Account"}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              to="/login"
              className="font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200"
            >
              Already have an account? Sign in
            </Link>
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

export default RegisterPage


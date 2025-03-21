import axios from "axios"
import { handleApiError } from "../utils/errorHandler"

const API_URL = process.env.REACT_APP_API_URL || "/api"

/**
 * Service for authentication-related API calls using our custom auth system
 */
const authService = {
  /**
   * Sign up a new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {Object} metadata - Additional user metadata
   * @returns {Promise<Object>} - User data
   */
  async signUp(email, password, metadata = {}) {
    try {
      console.log("Starting user registration process...")
      console.log("Email:", email)
      console.log("Metadata:", JSON.stringify(metadata))

      if (!email || !password) {
        throw new Error("Email and password are required")
      }

      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name: metadata.name || "",
      })

      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token)

        // Set Auth header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
      }

      return {
        user: response.data.user,
      }
    } catch (error) {
      console.error("Registration error details:", error)
      console.error("Error message:", error.response?.data?.error || error.message)

      // Check for specific error conditions
      if (error.response?.data?.error && error.response.data.error.includes("already exists")) {
        throw new Error("This email is already registered. Please use a different email or try logging in.")
      }

      handleApiError(error, "Failed to sign up")
      throw error
    }
  },

  // Alias for signUp to maintain compatibility
  register(email, password, metadata = {}) {
    return this.signUp(email, password, metadata)
  },

  /**
   * Sign in a user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User data
   */
  async signIn(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      })

      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token)

        // Set Auth header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
      }

      return {
        user: response.data.user,
      }
    } catch (error) {
      handleApiError(error, "Failed to sign in")
      throw error
    }
  },

  /**
   * Sign out the current user
   * @returns {Promise<void>}
   */
  async signOut() {
    try {
      // Call server logout endpoint
      await axios.post(`${API_URL}/auth/logout`)

      // Clear token from localStorage
      localStorage.removeItem("auth_token")

      // Remove Auth header
      delete axios.defaults.headers.common["Authorization"]
    } catch (error) {
      handleApiError(error, "Failed to sign out")
      throw error
    }
  },

  /**
   * Get the current user
   * @returns {Promise<Object>} - User data
   */
  async getCurrentUser() {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("auth_token")

      if (!token) {
        return null
      }

      // Set Auth header for this request
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      const response = await axios.get(`${API_URL}/auth/me`)

      return response.data.user
    } catch (error) {
      console.error("Error getting current user:", error)

      // If token is invalid or expired, clear it
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem("auth_token")
        delete axios.defaults.headers.common["Authorization"]
      }

      return null
    }
  },

  /**
   * Reset a user's password
   * @param {string} email - User email
   * @returns {Promise<boolean>} - Success status
   */
  async resetPassword(email) {
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email })
      return true
    } catch (error) {
      handleApiError(error, "Failed to send password reset email")
      throw error
    }
  },

  /**
   * Update a user's password
   * @param {string} newPassword - New password
   * @param {string} currentPassword - Current password for verification
   * @returns {Promise<Object>} - Success message
   */
  async updatePassword(newPassword, currentPassword) {
    try {
      const response = await axios.post(`${API_URL}/auth/update-password`, {
        newPassword,
        currentPassword,
      })

      return response.data
    } catch (error) {
      handleApiError(error, "Failed to update password")
      throw error
    }
  },

  /**
   * Complete the password reset process
   * @param {string} token - Reset token from email
   * @param {string} password - New password
   * @returns {Promise<Object>} - Success message
   */
  async completePasswordReset(token, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        password,
      })

      return response.data
    } catch (error) {
      handleApiError(error, "Failed to reset password")
      throw error
    }
  },

  /**
   * Setup axios interceptors for authentication
   */
  setupInterceptors() {
    // Request interceptor
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth_token")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    // Response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Redirect to login page if 401 Unauthorized
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("auth_token")
          // Optionally redirect to login page if not already there
          // window.location.href = '/login';
        }
        return Promise.reject(error)
      },
    )
  },

  async signInWithGoogle() {
    try {
      // Redirect to Google OAuth endpoint
      window.location.href = `${API_URL}/auth/google/login`
    } catch (error) {
      throw handleApiError(error, "Failed to sign in with Google")
    }
  },

  async signInWithGithub() {
    try {
      // Redirect to GitHub OAuth endpoint
      window.location.href = `${API_URL}/auth/github/login`
    } catch (error) {
      throw handleApiError(error, "Failed to sign in with GitHub")
    }
  },
}

// Setup authentication interceptors
authService.setupInterceptors()

export default authService


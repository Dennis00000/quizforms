import axios from "axios"
import { getSession } from "next-auth/react"

// Create axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Handle token refresh if needed
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Refresh token logic would go here
        // For now, we'll just redirect to login
        window.location.href = "/login"
        return Promise.reject(error)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient


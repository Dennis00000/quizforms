/**
 * Handle API errors consistently across the application
 *
 * @param {Error} error - The error object from axios
 * @param {Object} options - Options for error handling
 * @param {boolean} options.silent - If true, don't return a user-friendly message
 * @returns {Object} An error object with message and originalError
 */
export const handleApiError = (error, options = {}) => {
  console.error("API Error:", error)

  // Default error message for users
  let userMessage = "An unexpected error occurred. Please try again later."

  // Get HTTP status code
  const status = error.response?.status

  // Get the error message from the response if available
  const serverErrorMessage = error.response?.data?.error || error.message

  // Handle specific error codes
  if (status) {
    switch (status) {
      case 400:
        userMessage = serverErrorMessage || "Invalid request. Please check your data and try again."
        break
      case 401:
        userMessage = "Your session has expired. Please log in again."
        // You might want to trigger a logout/redirect here
        break
      case 403:
        userMessage = "You do not have permission to perform this action."
        break
      case 404:
        userMessage = "The requested resource was not found."
        break
      case 409:
        userMessage = serverErrorMessage || "A conflict occurred with your request."
        break
      case 422:
        userMessage = serverErrorMessage || "Validation error. Please check your data."
        break
      case 429:
        userMessage = "Too many requests. Please try again later."
        break
      case 500:
      case 502:
      case 503:
      case 504:
        userMessage = "Server error. Our team has been notified and is working on the issue."
        break
      default:
        userMessage = serverErrorMessage || userMessage
    }
  }

  // For network errors without status code
  if (error.code === "ECONNABORTED") {
    userMessage = "Request timed out. Please try again."
  }

  if (error.code === "ERR_NETWORK") {
    userMessage = "Network error. Please check your connection and try again."
  }

  return {
    message: options.silent ? null : userMessage,
    status,
    originalError: error,
    isApiError: true,
  }
}

export default handleApiError


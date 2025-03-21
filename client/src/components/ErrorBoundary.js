"use client"

import React from "react"
import { toast } from "react-hot-toast"

/**
 * Error boundary component to catch JavaScript errors anywhere in child component tree
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error: error instanceof Error ? error : new Error(String(error)) }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)

    // Show toast with error message
    const errorMessage = error?.message || "An unexpected error occurred"
    toast.error(errorMessage)
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || "An unexpected error occurred"

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{errorMessage}</p>
            {process.env.NODE_ENV === "development" && this.state.error?.stack && (
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm overflow-auto mb-4">
                {this.state.error.stack}
              </pre>
            )}
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    // If no error, render children normally
    return this.props.children
  }
}

export default ErrorBoundary


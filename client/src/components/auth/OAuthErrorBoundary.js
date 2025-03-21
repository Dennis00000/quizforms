"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

class OAuthErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("OAuth Error:", error, errorInfo)
    // Show error toast when error occurs
    toast.error("Authentication failed. Please try again.")
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
    // Show info toast when retrying
    toast.loading("Retrying authentication...")
  }

  handleGoBack = () => {
    // Show info toast when going back
    toast.info("Redirecting to login...")
    this.props.navigate("/login")
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                Authentication Error
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                {this.state.error?.message || "Something went wrong during authentication"}
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <button
                onClick={this.handleRetry}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try Again
              </button>
              <button
                onClick={this.handleGoBack}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Wrapper to use hooks with class component
const OAuthErrorBoundaryWrapper = (props) => {
  const navigate = useNavigate()
  return <OAuthErrorBoundary {...props} navigate={navigate} />
}

export default OAuthErrorBoundaryWrapper


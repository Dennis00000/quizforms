import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import { Provider } from "react-redux"
import { store } from "./store"
import AppRoutes from "./routes"
import ErrorBoundary from "./components/ErrorBoundary"
import "./i18n"
import "./styles/global.css"
import "./styles/light-mode.css"
import OAuthCallback from "./components/auth/OAuthCallback"
import OAuthErrorBoundary from "./components/auth/OAuthErrorBoundary"

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Provider store={store}>
          <ThemeProvider>
            <Toaster position="top-right" />
            <AuthProvider>
              <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
                <Routes>
                  <Route
                    path="/auth/callback"
                    element={
                      <OAuthErrorBoundary>
                        <OAuthCallback />
                      </OAuthErrorBoundary>
                    }
                  />
                  <Route path="/*" element={<AppRoutes />} />
                </Routes>
              </div>
            </AuthProvider>
          </ThemeProvider>
        </Provider>
      </Router>
    </ErrorBoundary>
  )
}

export default App


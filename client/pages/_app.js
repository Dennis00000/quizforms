import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "../src/contexts/AuthContext"
import { ThemeProvider } from "../src/contexts/ThemeContext"
import { Provider } from "react-redux"
import { store } from "../src/store"
import ErrorBoundary from "../src/components/ErrorBoundary"
import "../src/styles/global.css"
import "../src/styles/light-mode.css"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>
            <Toaster position="top-right" />
            <AuthProvider>
              <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
                {getLayout(<Component {...pageProps} />)}
              </div>
            </AuthProvider>
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </SessionProvider>
  )
}

export default MyApp


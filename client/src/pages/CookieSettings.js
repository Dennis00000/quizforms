"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"

const CookieSettings = () => {
  const { t } = useTranslation()
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true and disabled
    analytics: true,
    marketing: false,
    preferences: true,
  })

  const handleToggle = (type) => {
    if (type === "necessary") return // Can't toggle necessary cookies
    setCookiePreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const handleSave = () => {
    // Save to localStorage or your backend
    localStorage.setItem("cookiePreferences", JSON.stringify(cookiePreferences))
    toast.success(t("cookies.preferences_saved"))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t("cookies.title")}</h1>

          <p className="text-gray-600 dark:text-gray-300 mb-8">{t("cookies.description")}</p>

          <div className="space-y-6">
            {/* Necessary Cookies */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t("cookies.necessary.title")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t("cookies.necessary.description")}</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={cookiePreferences.necessary}
                  disabled
                  className="toggle-checkbox"
                  aria-label={t("cookies.necessary.toggle_label")}
                />
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t("cookies.analytics.title")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t("cookies.analytics.description")}</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={cookiePreferences.analytics}
                  onChange={() => handleToggle("analytics")}
                  className="toggle-checkbox"
                  aria-label={t("cookies.analytics.toggle_label")}
                />
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t("cookies.marketing.title")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t("cookies.marketing.description")}</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={cookiePreferences.marketing}
                  onChange={() => handleToggle("marketing")}
                  className="toggle-checkbox"
                  aria-label={t("cookies.marketing.toggle_label")}
                />
              </div>
            </div>

            {/* Preferences Cookies */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t("cookies.preferences.title")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t("cookies.preferences.description")}</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={cookiePreferences.preferences}
                  onChange={() => handleToggle("preferences")}
                  className="toggle-checkbox"
                  aria-label={t("cookies.preferences.toggle_label")}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t("cookies.save_preferences")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieSettings


"use client"

import { useState, useEffect } from "react"

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    bio: "",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchUserData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock user data
        const userData = {
          id: "123",
          name: "John Doe",
          email: "john.doe@example.com",
          company: "Acme Inc.",
          bio: "Product manager with a passion for user experience.",
          avatar: "/placeholder.svg?height=200&width=200",
          notifications: {
            email: true,
            sms: false,
            push: true,
          },
          plan: "Professional",
          memberSince: "2022-06-15",
        }

        setUser(userData)
        setFormData({
          name: userData.name,
          email: userData.email,
          company: userData.company,
          bio: userData.bio,
          notifications: userData.notifications,
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name.startsWith("notifications.")) {
      const notificationType = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationType]: checked,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update user state with form data
      setUser((prev) => ({
        ...prev,
        ...formData,
      }))

      setSubmitStatus({
        success: true,
        message: "Profile updated successfully!",
      })
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Failed to update profile. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Account Settings</h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Manage your profile and preferences.
              </p>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <img
                  className="h-16 w-16 rounded-full border-2 border-white dark:border-gray-700"
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                />
                <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-400 border-2 border-white dark:border-gray-700"></span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === "profile"
                    ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === "security"
                    ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("security")}
              >
                Security
              </button>
              <button
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === "billing"
                    ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("billing")}
              >
                Billing
              </button>
              <button
                className={`px-4 py-4 text-sm font-medium ${
                  activeTab === "notifications"
                    ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("notifications")}
              >
                Notifications
              </button>
            </div>

            {submitStatus && (
              <div
                className={`m-4 p-4 rounded-md ${submitStatus.success ? "bg-green-50 dark:bg-green-900" : "bg-red-50 dark:bg-red-900"}`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {submitStatus.success ? (
                      <svg
                        className="h-5 w-5 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p
                      className={`text-sm font-medium ${submitStatus.success ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}
                    >
                      {submitStatus.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="3"
                      value={formData.bio}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    ></textarea>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Brief description for your profile.</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-3 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            )}

            {activeTab === "security" && (
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Change password</h3>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="current-password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Current password
                    </label>
                    <input
                      type="password"
                      name="current-password"
                      id="current-password"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      New password
                    </label>
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Update password
                  </button>
                </div>

                <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Two-factor authentication
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                    <p>Add additional security to your account using two-factor authentication.</p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Set up two-factor authentication
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Subscription plan</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    You are currently on the{" "}
                    <span className="font-medium text-gray-900 dark:text-white">{user.plan}</span> plan.
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Upgrade plan
                  </button>
                </div>

                <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Payment method</h3>
                  <div className="mt-4 flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-8 w-8 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22 4H2c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h20c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H2V8h20v10zm-7-1h-6v-2h6v2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2024</p>
                    </div>
                    <div className="ml-auto">
                      <button
                        type="button"
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Billing history</h3>
                  <div className="mt-4 flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  Date
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  Description
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  Amount
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                  <span className="sr-only">View</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  Mar 1, 2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  Professional Plan - Monthly
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  $29.00
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500">
                                    View
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  Feb 1, 2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  Professional Plan - Monthly
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  $29.00
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500">
                                    View
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Notification preferences
                </h3>
                <div className="mt-6 space-y-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notifications.email"
                        name="notifications.email"
                        type="checkbox"
                        checked={formData.notifications.email}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-700 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notifications.email" className="font-medium text-gray-700 dark:text-gray-300">
                        Email notifications
                      </label>
                      <p className="text-gray-500 dark:text-gray-400">
                        Receive email notifications about form submissions, account updates, and more.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notifications.sms"
                        name="notifications.sms"
                        type="checkbox"
                        checked={formData.notifications.sms}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-700 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notifications.sms" className="font-medium text-gray-700 dark:text-gray-300">
                        SMS notifications
                      </label>
                      <p className="text-gray-500 dark:text-gray-400">
                        Receive text message notifications for important updates.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notifications.push"
                        name="notifications.push"
                        type="checkbox"
                        checked={formData.notifications.push}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-700 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notifications.push" className="font-medium text-gray-700 dark:text-gray-300">
                        Push notifications
                      </label>
                      <p className="text-gray-500 dark:text-gray-400">
                        Receive push notifications in your browser or mobile app.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save preferences"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage


import { NavLink } from "react-router-dom"

const TemplatesNav = () => {
  return (
    <nav className="space-y-1">
      <NavLink
        to="/templates/dashboard"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 font-medium ${
            isActive
              ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white"
              : "text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          } rounded-md transition-colors duration-150`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/templates/my-templates"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 font-medium ${
            isActive
              ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white"
              : "text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          } rounded-md transition-colors duration-150`
        }
      >
        My Templates
      </NavLink>
      <NavLink
        to="/templates/create"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 font-medium ${
            isActive
              ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white"
              : "text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          } rounded-md transition-colors duration-150`
        }
      >
        Create Template
      </NavLink>
      <NavLink
        to="/templates/submissions"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 font-medium ${
            isActive
              ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white"
              : "text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          } rounded-md transition-colors duration-150`
        }
      >
        Submissions
      </NavLink>
    </nav>
  )
}

export default TemplatesNav


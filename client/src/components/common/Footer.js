import { Link } from "react-router-dom"
import { FaX } from "react-icons/fa6"

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 mt-auto border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Stay Connected */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Stay Connected</h4>
            <p className="text-gray-900 dark:text-gray-300 mb-4">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-l focus:outline-none flex-grow border border-gray-300 dark:border-gray-600"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">→</button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Contact Us</h4>
            <div className="text-gray-900 dark:text-gray-300 space-y-2">
              <p>Vilnius, Lithuania</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: dennisopoola@gmail.com</p>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Follow Us</h4>
            <div className="flex items-center space-x-4">
              <FaX className="h-5 w-5 text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-900 dark:text-gray-300">&copy; 2025 quizform. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaLinkedin, FaX } from "react-icons/fa6"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Stay Connected */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Stay Connected</h4>
            <p className="text-gray-300 mb-4">Join our newsletter for the latest updates and exclusive offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 text-white px-4 py-2 rounded-l focus:outline-none flex-grow"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700 text-white">→</button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Contact Us</h4>
            <div className="text-gray-300 space-y-2">
              <p>Vilnius, Lithuania</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: dennisopoola@gmail.com</p>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Follow Us</h4>
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaX className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">&copy; 2025 quizform. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-300 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-white">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-300 hover:text-white">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


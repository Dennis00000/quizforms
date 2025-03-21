"use client"

import { useState } from "react"
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)

    // Simulate a successful submission
    setFormStatus("success")

    // Reset form after showing success message
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setFormStatus(null)
    }, 5000)
  }

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="w-6 h-6 text-blue-600" />,
      title: "Our Location",
      details: ["Vilnius", "Lithuania"],
    },
    {
      icon: <FaPhone className="w-6 h-6 text-blue-600" />,
      title: "Phone Number",
      details: ["+1 (123) 456-7890"],
    },
    {
      icon: <FaEnvelope className="w-6 h-6 text-blue-600" />,
      title: "Email Address",
      details: ["dennisopoola@gmail.com", "support@example.com"],
    },
    {
      icon: <FaClock className="w-6 h-6 text-blue-600" />,
      title: "Working Hours",
      details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 4pm", "Sunday: Closed"],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">Contact Us</h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
          Have questions or need assistance? We're here to help. Reach out to our team and we'll get back to you as soon
          as possible.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="mr-4 mt-1">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <ul className="space-y-1">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-300">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Send us a Message</h2>

            {formStatus === "success" && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <p>Thank you for your message! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-medium rounded-md transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-96 mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d147270.6305181758!2d25.097309668519866!3d54.700603650868725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd93fb5c6408f5%3A0x400d18c70e9dc40!2sVilnius%2C%20Lithuania!5e0!3m2!1sen!2sus!4v1655471241742!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map of Lithuania"
          ></iframe>
        </div>

        {/* FAQ Section */}
        <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What are your office hours?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our team is available Monday through Friday from a9M to 6PM, and Saturdays from 10AM to 4PM.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                How quickly do you respond to inquiries?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We aim to respond to all inquiries within 24 business hours.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Do you offer support for your products?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, we provide comprehensive support for all our products and services.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                How can I request a quote for a custom project?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                You can use the contact form above or email us directly at hello@example.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage


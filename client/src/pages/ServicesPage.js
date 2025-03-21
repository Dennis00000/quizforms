import { FaWpforms, FaUsers, FaChartPie, FaLayerGroup } from "react-icons/fa"

const ServicesPage = () => {
  const services = [
    {
      icon: <FaWpforms className="w-12 h-12 text-blue-600 mb-4" />,
      title: "Easy-to-use Form Builder",
      description: "Create professional forms with our intuitive drag-and-drop builder - no coding required.",
    },
    {
      icon: <FaUsers className="w-12 h-12 text-blue-600 mb-4" />,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time to create, edit and manage forms efficiently.",
    },
    {
      icon: <FaChartPie className="w-12 h-12 text-blue-600 mb-4" />,
      title: "Advanced Analytics",
      description: "Gain valuable insights with comprehensive analytics on form submissions and user behavior.",
    },
    {
      icon: <FaLayerGroup className="w-12 h-12 text-blue-600 mb-4" />,
      title: "Customizable Templates",
      description: "Choose from a wide range of professionally designed templates that you can fully customize.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">Our Services</h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
          QuizForm provides powerful form building solutions to help your business collect and analyze data efficiently.
          Our platform is designed to be both powerful and user-friendly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-transform hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                {service.icon}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Our Process</h2>

          <div className="flex flex-col md:flex-row justify-between items-start mt-8">
            <div className="flex-1 text-center p-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Discovery</h3>
              <p className="text-gray-600 dark:text-gray-300">We learn about your form needs and requirements</p>
            </div>

            <div className="flex-1 text-center p-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Planning</h3>
              <p className="text-gray-600 dark:text-gray-300">We help design the perfect form strategy</p>
            </div>

            <div className="flex-1 text-center p-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Implementation</h3>
              <p className="text-gray-600 dark:text-gray-300">We set up your forms and integration points</p>
            </div>

            <div className="flex-1 text-center p-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Optimization</h3>
              <p className="text-gray-600 dark:text-gray-300">We help you analyze results and improve your forms</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Ready to Start Building Forms?</h2>
          <a
            href="/contact"
            className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage


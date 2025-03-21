import Link from "next/link"

const ProductsPage = () => {
  const products = [
    {
      id: "basic",
      name: "Basic",
      description: "Everything you need to get started with simple forms and quizzes.",
      price: "$9",
      features: ["Up to 10 forms", "100 responses per month", "Basic analytics", "Email support", "Export to CSV"],
      cta: "Start with Basic",
      popular: false,
    },
    {
      id: "pro",
      name: "Professional",
      description: "Advanced features for professionals and growing businesses.",
      price: "$29",
      features: [
        "Unlimited forms",
        "1,000 responses per month",
        "Advanced analytics",
        "Priority email support",
        "Export to CSV/Excel/PDF",
        "Custom branding",
        "Form logic and branching",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Custom solutions for large organizations with specific needs.",
      price: "Custom",
      features: [
        "Unlimited everything",
        "Dedicated account manager",
        "Phone and email support",
        "Custom integrations",
        "SLA guarantees",
        "HIPAA compliance",
        "On-premises deployment option",
        "Advanced security features",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Choose the right plan for your needs
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 lg:mx-auto">
            Whether you're just getting started or need advanced features, we have a plan that's right for you.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${product.popular ? "border-2 border-blue-500 dark:border-blue-400" : "border border-gray-200 dark:border-gray-700"}`}
            >
              {product.popular && (
                <div className="px-4 py-1 bg-blue-500 text-white text-center text-sm font-medium">Most Popular</div>
              )}
              <div className="bg-white dark:bg-gray-800 px-6 py-8 flex-1">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <p className="mt-4 text-gray-500 dark:text-gray-300">{product.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{product.price}</span>
                    {product.id !== "enterprise" && (
                      <span className="text-base font-medium text-gray-500 dark:text-gray-400">/month</span>
                    )}
                  </p>
                  <ul className="mt-8 space-y-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-6 w-6 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700 dark:text-gray-300">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-8">
                <div>
                  <Link
                    href={product.id === "enterprise" ? "/contact" : "/signup"}
                    className={`block w-full py-3 px-4 rounded-md shadow text-center text-sm font-medium ${
                      product.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {product.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
            <div className="mt-6 space-y-6">
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Can I change plans later?</h4>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next
                  billing cycle.
                </p>
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Is there a free trial?</h4>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  Yes, we offer a 14-day free trial on all plans. No credit card required.
                </p>
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900 dark:text-white">
                  What payment methods do you accept?
                </h4>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                  We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.
                </p>
              </div>
            </div>
          </div>
          <div className="px-6 py-8 bg-gray-50 dark:bg-gray-700 sm:p-10">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Have more questions?{" "}
                  <Link href="/contact" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                    Contact our sales team
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage


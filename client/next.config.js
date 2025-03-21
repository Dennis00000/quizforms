/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure we can import from src directory
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    return config
  },
  // Redirect API calls to the server
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? `${process.env.API_URL || "http://localhost:5000"}/api/:path*`
            : "http://localhost:5000/api/:path*",
      },
    ]
  },
}

module.exports = nextConfig


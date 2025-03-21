const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-in-production"

/**
 * Authentication middleware that verifies JWT tokens
 * from either the Authorization header or cookies
 */
const auth = (req, res, next) => {
  try {
    // Get token from header or cookies
    let token

    // Check Authorization header
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]
    }
    // Check cookies as a fallback
    else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt
    }

    // If no token found, return unauthorized
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET)

    // Add user information to request object
    req.user = decoded

    // Proceed to the next middleware or route handler
    next()
  } catch (error) {
    console.error("Auth middleware error:", error)

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" })
    }

    res.status(401).json({ error: "Invalid token" })
  }
}

/**
 * Middleware that checks if a user is an admin
 * Must be used after the auth middleware
 */
const adminAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Access denied. Not authenticated." })
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Not authorized." })
  }

  next()
}

/**
 * Optional authentication middleware
 * Attaches user to request if token is valid, but doesn't require auth
 */
const optionalAuth = (req, res, next) => {
  try {
    // Get token from header or cookies
    let token

    // Check Authorization header
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]
    }
    // Check cookies as a fallback
    else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt
    }

    // If no token, just continue without setting req.user
    if (!token) {
      return next()
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET)

    // Add user information to request object
    req.user = decoded

    // Proceed to the next middleware or route handler
    next()
  } catch (error) {
    // Just continue without setting req.user if token is invalid
    next()
  }
}

module.exports = { auth, adminAuth, optionalAuth }


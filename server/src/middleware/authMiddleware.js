const jwt = require("jsonwebtoken")
const { db } = require("../config/db")
const logger = require("../utils/logger")

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here"

/**
 * Middleware to protect routes by validating JWT tokens
 */
const protect = async (req, res, next) => {
  let token

  // Get token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from the header
      token = req.headers.authorization.split(" ")[1]

      // If no token, return error
      if (!token) {
        logger.warn("Authorization header found but no token provided")
        return res.status(401).json({ error: "Not authenticated" })
      }

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET)

      // Check if user exists
      const userResult = await db.query("SELECT * FROM auth.users WHERE id = $1", [decoded.id])

      if (userResult.rows.length === 0) {
        logger.warn(`User ${decoded.id} from token not found in database`)
        return res.status(401).json({ error: "User not found" })
      }

      // Add user info to request object
      req.user = {
        id: decoded.id,
        email: decoded.email,
      }

      // Continue
      next()
    } catch (error) {
      logger.error(`Authentication error: ${error.message}`)

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token" })
      }

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" })
      }

      return res.status(500).json({ error: "Authentication failed" })
    }
  } else {
    logger.warn("Authorization header not found")
    return res.status(401).json({ error: "Not authenticated, no token provided" })
  }
}

/**
 * Middleware to check if the user has admin role
 * To be used after the protect middleware
 */
const requireAdmin = async (req, res, next) => {
  try {
    // User should be attached to req by the protect middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Not authenticated" })
    }

    // Query the profile to check the role
    const profileResult = await db.query("SELECT role FROM public.profiles WHERE id = $1", [req.user.id])

    if (profileResult.rows.length === 0) {
      logger.warn(`Profile not found for user ${req.user.id}`)
      return res.status(404).json({ error: "User profile not found" })
    }

    const profile = profileResult.rows[0]

    if (profile.role !== "admin") {
      logger.warn(`Access denied for user ${req.user.id} with role ${profile.role}`)
      return res.status(403).json({ error: "Access denied. Admin role required." })
    }

    // Continue
    next()
  } catch (error) {
    logger.error(`Admin check error: ${error.message}`)
    return res.status(500).json({ error: "Failed to validate admin role" })
  }
}

module.exports = {
  protect,
  requireAdmin,
}


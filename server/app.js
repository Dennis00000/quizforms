const express = require("express")
const session = require("express-session")
const passport = require("passport")
const MongoStore = require("connect-mongo")
const cors = require("cors")
require("./config/passport") // Passport config we created earlier

// Add Redis for better session management (optional but recommended)
const Redis = require("ioredis")
const RedisStore = require("connect-redis").default

const app = express()

// Create Redis client
const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
})

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

// Enhanced session configuration with Redis
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "sessionId", // Custom cookie name
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "lax",
    },
  }),
)

// Initialize Passport and restore authentication state from session
app.use(passport.initialize())
app.use(passport.session())

// Add rate limiting for OAuth routes
const rateLimit = require("express-rate-limit")
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: "Too many authentication attempts, please try again later",
})

app.use("/auth/*", authLimiter)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err)

  if (err.name === "AuthenticationError") {
    return res.status(401).json({
      error: "Authentication failed",
      message: err.message,
    })
  }

  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong",
  })
})


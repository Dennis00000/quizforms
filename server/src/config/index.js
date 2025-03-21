/**
 * Centralized configuration for the server
 */
const path = require("path")
const dotenv = require("dotenv")

// Load environment variables from .env file
dotenv.config()

// Environment
const env = process.env.NODE_ENV || "development"

// Base configuration
const config = {
  env,
  isDev: env === "development",
  isProd: env === "production",
  isTest: env === "test",

  // Server
  server: {
    port: Number.parseInt(process.env.PORT, 10) || 3002,
    host: process.env.HOST || "0.0.0.0",
    corsOrigin: process.env.CORS_ORIGIN || "*",
  },

  // Database
  database: {
    url: process.env.DATABASE_URL,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
  },

  // Authentication
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    saltRounds: Number.parseInt(process.env.SALT_ROUNDS, 10) || 10,
  },

  // Email
  email: {
    host: process.env.EMAIL_HOST,
    port: Number.parseInt(process.env.EMAIL_PORT, 10) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    from: process.env.EMAIL_FROM || "noreply@quizform.com",
  },

  // Redis
  redis: {
    url: process.env.REDIS_URL,
    enabled: process.env.REDIS_ENABLED === "true",
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || (env === "development" ? "debug" : "info"),
    dir: process.env.LOG_DIR || path.join(__dirname, "../../logs"),
  },

  // Rate limiting
  rateLimit: {
    windowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutes
    max: Number.parseInt(process.env.RATE_LIMIT_MAX, 10) || 100, // limit each IP to 100 requests per windowMs
  },

  // File uploads
  uploads: {
    maxSize: Number.parseInt(process.env.UPLOAD_MAX_SIZE, 10) || 5 * 1024 * 1024, // 5MB
    dir: process.env.UPLOAD_DIR || path.join(__dirname, "../../uploads"),
  },

  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number.parseInt(process.env.DB_PORT || "5432"),
    ssl: process.env.DB_SSL === "true",
  },
}

// Validate critical configuration
const requiredEnvVars = ["SUPABASE_URL", "SUPABASE_KEY", "JWT_SECRET"]

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
}

module.exports = config


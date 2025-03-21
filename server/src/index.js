require("dotenv").config()
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
// const compression = require('compression');
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")
const config = require("./config")
const routes = require("./routes")
const { errorHandler } = require("./middleware/errorHandler")
const { connect: connectCache } = require("./services/cacheService")
const { initializeDatabase } = require("./db/init")
const { supabase, testConnection } = require("./lib/supabase")
const http = require("http")
const { logger } = require("./utils/logger")

// Create Express app
const app = express()
const PORT = process.env.PORT || 3002

// Comment out compression if you don't want to install it
// app.use(compression());

// Security middleware
app.use(helmet())

// CORS middleware
app.use(cors(config.cors))

// Body parser middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Comment out morgan if you don't want to install it
app.use(morgan(config.nodeEnv === "development" ? "dev" : "combined"))

// Debug logging
app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.path}`)
  next()
})

// Basic test routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the QuizForm API" })
})

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" })
})

// Add this before your routes
app.get("/api/bypass-test", (req, res) => {
  logger.debug("Headers:", req.headers)
  res.json({
    message: "Bypass test successful",
    authHeader: req.header("Authorization"),
  })
})

// Add this before the API routes section
app.get("/direct-test", (req, res) => {
  res.json({ message: "Direct test route works!" })
})

// API routes
app.use("/api", routes)

// Error handling middleware
app.use(errorHandler)

// Create HTTP server
const server = http.createServer(app)

// Initialize WebSocket (if needed)
// initSocket(server);

// Properly handle errors with null checks
process.on("unhandledRejection", (reason, promise) => {
  if (reason) {
    logger.error("Unhandled Rejection at:", promise, "reason:", reason)
  } else {
    logger.error("Unhandled Rejection occurred with no error details")
  }
})

process.on("uncaughtException", (error) => {
  if (error) {
    logger.error("Uncaught Exception:", error)
  } else {
    logger.error("Uncaught Exception occurred with no error details")
  }
  // Give the logger time to write before exiting
  setTimeout(() => {
    process.exit(1)
  }, 1000)
})

// Start the server
async function startServer() {
  try {
    // Test Supabase connection
    logger.info("Testing Supabase connection...")
    const connectionOk = await testConnection()
    logger.debug("Connection test result:", connectionOk)

    if (!connectionOk) {
      logger.error("Failed to connect to Supabase. Exiting...")
      process.exit(1)
    }

    try {
      // Initialize database
      logger.info("Initializing database...")
      await initializeDatabase() // This function returns void
      logger.info("Database initialized successfully")
    } catch (dbError) {
      logger.error("Failed to initialize database:", dbError)
      process.exit(1)
    }

    // Start listening
    server.listen(PORT, () => {
      logger.info(`Server running in ${config.env || "development"} mode on port ${PORT}`)
    })

    // Handle server errors
    server.on("error", (error) => {
      if (error.syscall !== "listen") {
        throw error
      }

      const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT

      // Handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          logger.error(`${bind} requires elevated privileges`)
          process.exit(1)
          break
        case "EADDRINUSE":
          logger.error(`${bind} is already in use`)
          process.exit(1)
          break
        default:
          throw error
      }
    })
  } catch (error) {
    if (error) {
      logger.error("Failed to start server:", error)
    } else {
      logger.error("Failed to start server with no error details")
    }
    // Give the logger time to write before exiting
    setTimeout(() => {
      process.exit(1)
    }, 1000)
  }
}

// Remove the immediate invocation
// startServer();  // <-- Remove this line

// Then start the server
startServer().catch((error) => {
  logger.error("Failed to start server:", error)
  process.exit(1)
})

// Handle graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully")
  server.close(() => {
    logger.info("Server closed")
    // Give the logger time to write before exiting
    setTimeout(() => {
      process.exit(0)
    }, 1000)
  })

  // Force close after 10s
  setTimeout(() => {
    logger.error("Could not close connections in time, forcefully shutting down")
    // Give the logger time to write before exiting
    setTimeout(() => {
      process.exit(1)
    }, 1000)
  }, 10000)
})


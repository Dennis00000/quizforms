const winston = require("winston")
const path = require("path")
const fs = require("fs")

// Create logs directory if it doesn't exist
const logDir = path.join(process.cwd(), "logs")
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
)

// Define console format for readability
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? "\n" + info.stack : ""}`,
  ),
)

// Create the logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: logFormat,
  defaultMeta: { service: "api" },
  transports: [
    // Write to all logs with level 'info' and below to 'combined.log'
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write all logs with level 'error' and below to 'error.log'
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "exceptions.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "rejections.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
})

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
      handleExceptions: true,
      handleRejections: true,
    }),
  )
}

module.exports = { logger }


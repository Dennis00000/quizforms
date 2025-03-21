const { Pool } = require("pg")
require("dotenv").config()
const winston = require("winston")

// Create a logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`
    }),
  ),
  transports: [new winston.transports.Console()],
})

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for some Supabase connections
  },
})

// Test the connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err.stack)
  } else {
    console.log("Database connected successfully at:", res.rows[0].now)
  }
})

// Export a db object with query method
const db = {
  /**
   * Execute a SQL query with parameters
   * @param {string} text - SQL query text
   * @param {Array} params - Query parameters
   * @returns {Promise} - Query result
   */
  query: (text, params) => pool.query(text, params),

  /**
   * Get a client from the pool
   * @returns {Promise} - Client from the pool
   */
  getClient: async () => {
    const client = await pool.connect()

    const query = client.query
    const release = client.release

    // Override client.query to log queries
    client.query = (...args) => {
      client.lastQuery = args
      return query.apply(client, args)
    }

    // Override client.release to log release
    client.release = () => {
      client.query = query
      client.release = release
      return release.apply(client)
    }

    return client
  },
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
}


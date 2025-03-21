const { Pool } = require("pg")
const config = require("../config")

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
  ssl: config.db.ssl
    ? {
        rejectUnauthorized: false,
      }
    : false,
})

// Test that the pool can connect
pool.on("connect", () => {
  console.log("Database pool connected")
})

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

module.exports = pool


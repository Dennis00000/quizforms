#!/usr/bin/env node

require("dotenv").config()
const { runMigrations } = require("../src/db/migrateRunner")
const logger = require("../src/utils/logger")

logger.info("Starting migration script")

runMigrations()
  .then(() => {
    logger.info("Migrations completed successfully")
    process.exit(0)
  })
  .catch((error) => {
    logger.error(`Migration failed: ${error.message}`)
    process.exit(1)
  })


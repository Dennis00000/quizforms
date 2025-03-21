const fs = require("fs")
const path = require("path")
const { db } = require("../config/db")
const logger = require("../utils/logger")

const migrationsFolder = path.join(__dirname, "migrations")

/**
 * Run migrations in the specified folder
 */
const runMigrations = async () => {
  // Check if migrations folder exists
  if (!fs.existsSync(migrationsFolder)) {
    logger.error(`Migrations folder not found: ${migrationsFolder}`)
    return
  }

  try {
    logger.info("Starting database migrations...")

    // Get all migration files
    const files = fs
      .readdirSync(migrationsFolder)
      .filter((file) => file.endsWith(".sql"))
      .sort() // Sort files alphabetically

    if (files.length === 0) {
      logger.info("No migration files found")
      return
    }

    logger.info(`Found ${files.length} migration files: ${files.join(", ")}`)

    // Create migrations table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS public.migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Get already applied migrations
    const { rows: appliedMigrations } = await db.query("SELECT name FROM public.migrations")
    const appliedSet = new Set(appliedMigrations.map((m) => m.name))

    // Filter out already applied migrations
    const pendingMigrations = files.filter((file) => !appliedSet.has(file))

    if (pendingMigrations.length === 0) {
      logger.info("No pending migrations to apply")
      return
    }

    logger.info(`Applying ${pendingMigrations.length} pending migrations: ${pendingMigrations.join(", ")}`)

    // Apply each migration in a transaction
    for (const migration of pendingMigrations) {
      logger.info(`Applying migration: ${migration}`)

      const migrationPath = path.join(migrationsFolder, migration)
      const migrationSQL = fs.readFileSync(migrationPath, "utf8")

      const client = await db.getClient()

      try {
        await client.query("BEGIN")

        // Run the migration
        await client.query(migrationSQL)

        // Record the migration as applied
        await client.query("INSERT INTO public.migrations (name) VALUES ($1)", [migration])

        await client.query("COMMIT")
        logger.info(`Successfully applied migration: ${migration}`)
      } catch (error) {
        await client.query("ROLLBACK")
        logger.error(`Failed to apply migration ${migration}: ${error.message}`)
        throw error
      } finally {
        client.release()
      }
    }

    logger.info("Database migrations completed successfully")
  } catch (error) {
    logger.error(`Migration error: ${error.message}`)
    throw error
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => {
      logger.info("Migration process completed")
      process.exit(0)
    })
    .catch((error) => {
      logger.error(`Migration process failed: ${error.message}`)
      process.exit(1)
    })
} else {
  // Export for use in other files
  module.exports = { runMigrations }
}


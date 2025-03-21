const fs = require("fs")
const path = require("path")
const { logger } = require("../utils/logger")
const config = require("../config")
const pool = require("./pool")
const { supabase } = require("../lib/supabase")

// Function to split SQL into individual statements
function splitSqlStatements(sql) {
  // Remove comments and empty lines
  const cleanedSql = sql
    .replace(/--.*$/gm, "") // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
    .trim()

  // Split by semicolons, but respect dollar-quoted strings
  const statements = []
  let currentStatement = ""
  let inDollarQuote = false
  let dollarTag = ""

  for (let i = 0; i < cleanedSql.length; i++) {
    const char = cleanedSql[i]
    const nextChar = cleanedSql[i + 1] || ""

    // Check for dollar quote start/end
    if (char === "$" && nextChar === "$") {
      if (!inDollarQuote) {
        inDollarQuote = true
        dollarTag = "$$"
      } else if (inDollarQuote && dollarTag === "$$") {
        inDollarQuote = false
      }
      currentStatement += char
    }
    // Check for semicolon outside of dollar quotes
    else if (char === ";" && !inDollarQuote) {
      statements.push(currentStatement.trim() + ";")
      currentStatement = ""
    }
    // Add character to current statement
    else {
      currentStatement += char
    }
  }

  // Add the last statement if it exists and doesn't end with semicolon
  if (currentStatement.trim()) {
    statements.push(currentStatement.trim() + (currentStatement.trim().endsWith(";") ? "" : ";"))
  }

  // Filter out empty statements
  return statements.filter((stmt) => stmt.trim() !== ";")
}

// Add this function before initializeDatabase
async function setupDatabase() {
  try {
    logger.info("Setting up database...")

    // Read schema SQL file
    const schemaPath = path.join(__dirname, "migrations", "consolidated_schema.sql")
    const schemaSql = fs.readFileSync(schemaPath, "utf8")

    // Split into individual statements
    const statements = splitSqlStatements(schemaSql)

    logger.info(`Found ${statements.length} SQL statements to execute`)

    // Execute each statement using Supabase service client
    let successCount = 0
    let errorCount = 0

    for (const statement of statements) {
      if (!statement.trim()) continue

      try {
        // Try using the service client to execute SQL directly
        const { error } = await supabase.rpc("exec_sql", { sql: statement })

        if (error) {
          if (error.code === "PGRST302") {
            // Function not found
            logger.warn("exec_sql function not found, skipping SQL execution")
            // You'll need to run the SQL statements manually in the Supabase SQL editor
            logger.info("Please run these SQL statements in the Supabase SQL editor:")
            logger.info(schemaSql)
            return
          }
          errorCount++
          logger.error(`Error executing SQL statement: ${error.message}`)
          logger.error(`Statement: ${statement.substring(0, 100)}${statement.length > 100 ? "..." : ""}`)
        } else {
          successCount++
        }
      } catch (err) {
        errorCount++
        logger.error(`Error executing SQL statement: ${err.message}`)
        logger.error(`Statement: ${statement.substring(0, 100)}${statement.length > 100 ? "..." : ""}`)
      }
    }

    logger.info(`Database setup completed with ${successCount} successful statements and ${errorCount} errors`)
  } catch (error) {
    logger.error("Failed to set up database:", error)
    throw error
  }
}

// Initialize database
async function initializeDatabase() {
  try {
    logger.info("Starting database initialization...")

    // Test the connection first
    try {
      const { data, error } = await supabase.from("schema_version").select("version").single()

      logger.debug("Database initialization response:", { data, error })

      if (error) {
        if (error.code === "PGRST116") {
          // Table doesn't exist, need to run migrations
          logger.info("Schema version table not found, running initial setup...")
          await setupDatabase()
          return
        }
        throw error
      }

      logger.info("Database already initialized, version:", data?.version)
    } catch (queryError) {
      if (queryError.code === "PGRST116") {
        // Table doesn't exist, need to run migrations
        logger.info("Schema version table not found, running initial setup...")
        await setupDatabase()
        return
      }
      throw queryError
    }
  } catch (error) {
    logger.error("Failed to initialize database:", error)
    throw error
  }
}

// Export the initializeDatabase function directly
module.exports = { initializeDatabase }


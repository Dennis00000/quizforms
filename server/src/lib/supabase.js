console.log("Loading lib/supabase.js...")

const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") })
const { createClient } = require("@supabase/supabase-js")
const config = require("../config")
const { logger } = require("../utils/logger")

const supabaseUrl = process.env.SUPABASE_URL?.trim()
const supabaseKey = process.env.SUPABASE_KEY?.trim()
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY?.trim()

console.log("Debug - Environment Variables:", {
  url: supabaseUrl ? `Found: ${supabaseUrl}` : "Not found",
  key: supabaseKey ? `Found (length: ${supabaseKey.length})` : "Not found",
  serviceKey: supabaseServiceKey ? `Found (length: ${supabaseServiceKey.length})` : "Not found",
})

if (!supabaseUrl || !supabaseKey || !supabaseServiceKey) {
  throw new Error("Missing required Supabase environment variables")
}

let supabase // Rename from supabaseClient

try {
  supabase = createClient(supabaseUrl, supabaseKey)
  console.log("Supabase client created successfully")
} catch (error) {
  console.error("Error creating Supabase client:", error.message)
  throw error
}

// Create Supabase service client with admin privileges
let supabaseService
try {
  // Use environment variables directly instead of config
  supabaseService = createClient(
    supabaseUrl, // Use the same URL
    supabaseServiceKey, // Use the service key from env
  )
  console.log("Supabase service client created successfully")
} catch (error) {
  console.error("Error creating Supabase service client:", error.message)
}

// Test connection to Supabase
const testConnection = async () => {
  try {
    logger.info("Testing Supabase connection...")

    if (!supabase?.from) {
      logger.error("Supabase client not properly initialized")
      return false
    }

    logger.debug("About to make Supabase query...")

    try {
      // Try a simpler query first - wrap in try/catch to get more details
      const response = await supabase.from("profiles").select("count")

      logger.debug("Raw Supabase response:", response) // Log the entire response

      if (!response) {
        logger.error("No response from Supabase")
        return false
      }

      // Log the response shape
      logger.debug("Response shape:", {
        keys: Object.keys(response),
        status: response.status,
        statusText: response.statusText,
      })

      const { data, error } = response

      if (error) {
        if (error.code === "PGRST116") {
          // Table doesn't exist, but connection works
          logger.warn("Profiles table not found, but connection successful")
          return true
        }
        logger.error("Supabase connection error:", error)
        return false
      }

      logger.info("Supabase connection test successful")
      return true
    } catch (queryError) {
      logger.error("Error during Supabase query:", queryError)
      return false
    }
  } catch (error) {
    logger.error("Supabase connection test failed:", error)
    return false
  }
}

/**
 * Get a public URL for a file in storage
 */
function getPublicUrl(bucket, filePath) {
  if (!bucket || !filePath) return null

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)

  return data.publicUrl
}

console.log("Exporting supabase module...")

module.exports = {
  supabase, // Export directly
  supabaseService: supabaseService || null,
  testConnection,
  getPublicUrl,
}


require("dotenv").config()
const { createClient } = require("@supabase/supabase-js")

console.log("Testing Supabase Connection...")
const supabaseUrl = process.env.SUPABASE_URL?.trim()
const supabaseKey = process.env.SUPABASE_KEY?.trim()

console.log("SUPABASE_URL:", supabaseUrl)
console.log("SUPABASE_KEY:", supabaseKey ? `${supabaseKey.substring(0, 10)}...` : "not found")
console.log("SUPABASE_KEY length:", supabaseKey ? supabaseKey.length : "not found")

try {
  const supabase = createClient(supabaseUrl, supabaseKey)
  console.log("Supabase client created successfully")

  // Test a simple query
  supabase
    .from("profiles")
    .select("count")
    .then(({ data, error }) => {
      if (error) console.error("Query error:", error)
      else console.log("Query successful:", data)
    })
} catch (error) {
  console.error("Error creating Supabase client:", error)
}


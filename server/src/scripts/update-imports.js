const fs = require("fs")
const path = require("path")

const filesToUpdate = [
  "controllers/authController.js",
  "controllers/exportController.js",
  "controllers/homeController.js",
  "controllers/searchController.js",
  "controllers/tagController.js",
  "controllers/uploadController.js",
  "db/db-init.js",
  "db/seed.js",
  "middleware/roleCheck.js",
  "routes/questions.js",
  "routes/submissions.js",
  "routes/templates-minimal.js",
  "routes/test.js",
  "routes/api/test.js",
  "routes/templates/basic.js",
  "routes/templates/detail.js",
  "routes/templates/search.js",
  "routes/templates/user.js",
]

filesToUpdate.forEach((filePath) => {
  const fullPath = path.join(__dirname, "..", filePath)
  try {
    let content = fs.readFileSync(fullPath, "utf8")

    // Update the imports
    content = content.replace(/require$$['"]\.\.+\/config\/supabase['"]$$/g, (match) => {
      // Count the number of ../ in the path
      const depth = (filePath.match(/\//g) || []).length
      const prefix = "../".repeat(depth)
      return `require('${prefix}lib/supabase')`
    })

    fs.writeFileSync(fullPath, content)
    console.log(`Updated ${filePath}`)
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error)
  }
})


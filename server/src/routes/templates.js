const express = require("express")
const router = express.Router()
const templateController = require("../controllers/templateController")
const { auth } = require("../middleware/auth")
const { body, validationResult } = require("express-validator")

// Debug auth middleware
console.log("Auth middleware type:", typeof auth)
console.log("Auth middleware:", auth)

// Middleware to check validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Test route without auth first
router.post("/test", (req, res) => {
  res.json({ message: "Test route works" })
})

// Test auth middleware separately
const testAuth = (req, res, next) => {
  console.log("Test auth middleware")
  next()
}

router.post("/test-auth", auth, (req, res) => {
  res.json({ message: "Auth test route works" })
})

router.post("/test-validation", body("title").trim().isLength({ min: 3 }), handleValidationErrors, (req, res) => {
  res.json({ message: "Validation test route works" })
})

// Static routes
router.get("/", templateController.getTemplates)
router.get("/latest", templateController.getLatestTemplates)
router.get("/popular", templateController.getPopularTemplates)

/**
 * @route   POST /api/templates
 * @desc    Create a new template
 * @access  Private
 */
router.post(
  "/",
  auth,
  body("title").trim().isLength({ min: 3, max: 100 }).withMessage("Title must be between 3 and 100 characters"),
  body("description").optional().trim(),
  body("topic").trim().notEmpty().withMessage("Topic is required"),
  body("is_public").optional().isBoolean(),
  body("tags").optional().isArray(),
  handleValidationErrors,
  (req, res, next) => {
    // Wrap the controller method in a proper middleware function
    try {
      return templateController.createTemplate(req, res, next)
    } catch (err) {
      next(err)
    }
  },
)

/**
 * @route   GET /api/templates/:id
 * @desc    Get a template by ID
 * @access  Public
 */
router.get("/:id", templateController.getTemplate)

/**
 * @route   PUT /api/templates/:id
 * @desc    Update a template
 * @access  Private
 */
router.put(
  "/:id",
  auth,
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  body("description").optional().trim(),
  body("topic").optional().trim(),
  body("is_public").optional().isBoolean(),
  body("tags").optional().isArray(),
  handleValidationErrors,
  (req, res, next) => {
    try {
      return templateController.updateTemplate(req, res, next)
    } catch (err) {
      next(err)
    }
  },
)

/**
 * @route   DELETE /api/templates/:id
 * @desc    Delete a template
 * @access  Private
 */
router.delete("/:id", auth, templateController.deleteTemplate)

/**
 * @route   POST /api/templates/:id/like
 * @desc    Toggle like on a template
 * @access  Private
 */
router.post("/:id/like", auth, templateController.toggleLike)

module.exports = router


const express = require("express")
const router = express.Router()
const { supabase } = require("../lib/supabase")
const { auth } = require("../middleware/auth")
const templateController = require("../controllers/templateController")
const { body, validationResult } = require("express-validator")

// Debug middleware
router.use((req, res, next) => {
  console.log("Template minimal route:", {
    method: req.method,
    path: req.path,
  })
  next()
})

// Middleware to check validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Get all templates (minimal data)
router.get("/", (req, res, next) => {
  try {
    return templateController.getTemplates(req, res, next)
  } catch (err) {
    next(err)
  }
})

// Get a template by ID (minimal data)
router.get("/:id", (req, res, next) => {
  try {
    return templateController.getTemplate(req, res, next)
  } catch (err) {
    next(err)
  }
})

// Create a template (minimal version)
const createTemplateValidation = [
  body("title").trim().isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
  body("description").optional().trim(),
  body("topic").trim().notEmpty().withMessage("Topic is required"),
  body("is_public").optional().isBoolean(),
  body("tags").optional().isArray(),
]

router.post("/", auth, createTemplateValidation, handleValidationErrors, (req, res, next) => {
  try {
    return templateController.createTemplate(req, res, next)
  } catch (err) {
    next(err)
  }
})

// Update a template (minimal version)
const updateTemplateValidation = [
  body("title").optional().trim().isLength({ min: 3 }),
  body("description").optional().trim(),
  body("topic").optional().trim(),
  body("is_public").optional().isBoolean(),
  body("tags").optional().isArray(),
]

router.put("/:id", auth, updateTemplateValidation, handleValidationErrors, (req, res, next) => {
  try {
    return templateController.updateTemplate(req, res, next)
  } catch (err) {
    next(err)
  }
})

// Delete a template
router.delete("/:id", auth, (req, res, next) => {
  try {
    return templateController.deleteTemplate(req, res, next)
  } catch (err) {
    next(err)
  }
})

module.exports = router


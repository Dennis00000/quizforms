const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth") // Destructure auth
const userController = require("../controllers/userController")
const { body, validationResult } = require("express-validator")

// Middleware to check validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

/**
 * @route   GET /api/users
 * @desc    Get all users (admin only)
 * @access  Private/Admin
 */
router.get("/", auth, (req, res, next) => {
  try {
    return userController.getAllUsers(req, res, next)
  } catch (err) {
    next(err)
  }
})

/**
 * @route   GET /api/users/me
 * @desc    Get current user's profile
 * @access  Private
 */
router.get("/me", auth, (req, res, next) => {
  try {
    return userController.getCurrentUser(req, res, next)
  } catch (err) {
    next(err)
  }
})

/**
 * @route   PUT /api/users/me
 * @desc    Update current user's profile
 * @access  Private
 */
router.put(
  "/me",
  auth,
  [body("name").optional().trim().isLength({ min: 2 }), body("email").optional().isEmail(), handleValidationErrors],
  (req, res, next) => {
    try {
      return userController.updateCurrentUser(req, res, next)
    } catch (err) {
      next(err)
    }
  },
)

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private/Admin
 */
router.get("/:id", auth, (req, res, next) => {
  try {
    return userController.getUser(req, res, next)
  } catch (err) {
    next(err)
  }
})

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Private/Admin
 */
router.put(
  "/:id",
  auth,
  [
    body("name").optional().trim().isLength({ min: 2 }),
    body("email").optional().isEmail(),
    body("role").optional().isIn(["user", "admin"]),
    body("status").optional().isIn(["active", "inactive"]),
    handleValidationErrors,
  ],
  (req, res, next) => {
    try {
      return userController.updateUser(req, res, next)
    } catch (err) {
      next(err)
    }
  },
)

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Private/Admin
 */
router.delete("/:id", auth, (req, res, next) => {
  try {
    return userController.deleteUser(req, res, next)
  } catch (err) {
    next(err)
  }
})

module.exports = router


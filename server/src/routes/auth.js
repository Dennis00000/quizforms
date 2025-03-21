const express = require("express")
const router = express.Router()
const { body, validationResult } = require("express-validator")
const { authLimiter } = require("../middleware/security")
const authController = require("../controllers/authController")
const { protect } = require("../middleware/authMiddleware")

// Debug middleware
router.use((req, res, next) => {
  console.log("Auth route hit:", {
    method: req.method,
    path: req.path,
    body: req.body,
    headers: req.headers,
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

// Public routes
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("name").trim().notEmpty().withMessage("Name is required"),
    handleValidationErrors,
  ],
  (req, res, next) => {
    try {
      return authController.register(req, res, next)
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidationErrors,
  ],
  (req, res, next) => {
    try {
      return authController.login(req, res, next)
    } catch (err) {
      next(err)
    }
  },
)

router.post("/reset-password/request", (req, res, next) => {
  try {
    return authController.requestPasswordReset(req, res, next)
  } catch (err) {
    next(err)
  }
})

router.post("/reset-password/complete", (req, res, next) => {
  try {
    return authController.completePasswordReset(req, res, next)
  } catch (err) {
    next(err)
  }
})

// Protected routes
router.get("/current-user", protect, (req, res, next) => {
  try {
    return authController.getCurrentUser(req, res, next)
  } catch (err) {
    next(err)
  }
})

router.post("/update-password", protect, (req, res, next) => {
  try {
    return authController.updatePassword(req, res, next)
  } catch (err) {
    next(err)
  }
})

// Logout route
router.post("/logout", protect, (req, res, next) => {
  try {
    return authController.logout(req, res, next)
  } catch (err) {
    next(err)
  }
})

// Password reset request route
router.post(
  "/forgot-password",
  authLimiter,
  [body("email").isEmail().withMessage("Please enter a valid email"), handleValidationErrors],
  (req, res, next) => {
    try {
      return authController.requestPasswordReset(req, res, next)
    } catch (err) {
      next(err)
    }
  },
)

// Reset password route
router.post(
  "/reset-password",
  authLimiter,
  [
    body("token").notEmpty().withMessage("Token is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    handleValidationErrors,
  ],
  (req, res, next) => {
    try {
      return authController.completePasswordReset(req, res, next)
    } catch (err) {
      next(err)
    }
  },
)

// Refresh token route
router.post("/refresh-token", (req, res, next) => {
  try {
    return authController.refreshToken(req, res, next)
  } catch (err) {
    next(err)
  }
})

module.exports = router


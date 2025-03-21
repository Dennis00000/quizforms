const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const { db } = require("../config/db")
const logger = require("../utils/logger")
const { sendPasswordResetEmail } = require("../utils/emailService")
const { supabase } = require("../lib/supabase")
const { AppError } = require("../middleware/errorHandler")

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here"
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"

class AuthController {
  /**
   * Register a new user
   */
  async register(req, res, next) {
    try {
      const { email, password, name } = req.body

      const { data: user, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (error) throw new AppError(error.message, 400)

      res.status(201).json({
        status: "success",
        data: { user },
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Login user
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body

      const {
        data: { user, session },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw new AppError(error.message, 401)

      res.json({
        status: "success",
        data: { user, session },
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Logout user
   */
  async logout(req, res, next) {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw new AppError(error.message, 500)

      res.json({
        status: "success",
        message: "Logged out successfully",
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(req, res, next) {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.refreshSession()
      if (error) throw new AppError(error.message, 401)

      res.json({
        status: "success",
        data: { session },
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get current user from JWT token
   */
  async getCurrentUser(req, res, next) {
    try {
      if (!req.user) {
        throw new AppError("Not authenticated", 401)
      }

      const userWithProfile = await this.getUserWithProfile(req.user.id)

      if (!userWithProfile) {
        throw new AppError("User not found", 404)
      }

      res.json({
        status: "success",
        data: { user: userWithProfile },
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(req, res, next) {
    try {
      const { email } = req.body

      if (!email) {
        throw new AppError("Email is required", 400)
      }

      logger.info(`Password reset requested for: ${email}`)

      // Find user
      const userResult = await db.query("SELECT * FROM auth.users WHERE email = $1", [email])

      if (userResult.rows.length === 0) {
        // Don't reveal that the user doesn't exist for security
        return res.status(200).json({ message: "If the email exists, a reset link will be sent" })
      }

      const user = userResult.rows[0]

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex")
      const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

      // Store token in DB
      await db.query(
        `UPDATE auth.users 
         SET reset_token = $1, reset_token_expires = $2
         WHERE id = $3`,
        [resetToken, resetTokenExpiry, user.id],
      )

      // Send email
      await sendPasswordResetEmail(email, resetToken)

      logger.info(`Password reset token generated for user: ${user.id}`)

      return res.status(200).json({ message: "If the email exists, a reset link will be sent" })
    } catch (error) {
      logger.error(`Password reset request error: ${error.message}`)
      next(error)
    }
  }

  /**
   * Complete password reset
   */
  async completePasswordReset(req, res, next) {
    try {
      const { token, password } = req.body

      if (!token || !password) {
        throw new AppError("Token and password are required", 400)
      }

      logger.info("Processing password reset completion")

      // Find user with this token
      const userResult = await db.query(
        `SELECT * FROM auth.users 
         WHERE reset_token = $1 AND reset_token_expires > NOW()`,
        [token],
      )

      if (userResult.rows.length === 0) {
        logger.warn("Password reset failed: Invalid or expired token")
        return res.status(400).json({ error: "Invalid or expired reset token" })
      }

      const user = userResult.rows[0]

      // Hash new password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // Update password and clear token
      await db.query(
        `UPDATE auth.users 
         SET password = $1, reset_token = NULL, reset_token_expires = NULL
         WHERE id = $2`,
        [hashedPassword, user.id],
      )

      logger.info(`Password reset completed for user: ${user.id}`)

      return res.status(200).json({ message: "Password has been reset successfully" })
    } catch (error) {
      logger.error(`Complete password reset error: ${error.message}`)
      next(error)
    }
  }

  /**
   * Update password
   */
  async updatePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body

      if (!currentPassword || !newPassword) {
        throw new AppError("Current and new password are required", 400)
      }

      logger.info(`Password update requested for user: ${req.user.id}`)

      // Get user with password
      const userResult = await db.query("SELECT * FROM auth.users WHERE id = $1", [req.user.id])

      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: "User not found" })
      }

      const user = userResult.rows[0]

      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password)

      if (!isMatch) {
        logger.warn(`Password update failed: Current password invalid for user ${req.user.id}`)
        return res.status(400).json({ error: "Current password is incorrect" })
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newPassword, salt)

      // Update password
      await db.query("UPDATE auth.users SET password = $1 WHERE id = $2", [hashedPassword, req.user.id])

      logger.info(`Password updated successfully for user: ${req.user.id}`)

      return res.status(200).json({ message: "Password updated successfully" })
    } catch (error) {
      logger.error(`Update password error: ${error.message}`)
      next(error)
    }
  }

  /**
   * Helper function to get user with profile
   */
  async getUserWithProfile(userId) {
    try {
      // Join users and profiles
      const result = await db.query(
        `SELECT u.id, u.email, u.created_at, 
                p.name, p.role, p.avatar_url
         FROM auth.users u
         LEFT JOIN public.profiles p ON u.id = p.id
         WHERE u.id = $1`,
        [userId],
      )

      if (result.rows.length === 0) {
        return null
      }

      // Don't include the password in the returned user object
      const user = result.rows[0]

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatar_url,
        createdAt: user.created_at,
      }
    } catch (error) {
      logger.error(`Error fetching user with profile: ${error.message}`)
      throw error
    }
  }
}

module.exports = new AuthController()


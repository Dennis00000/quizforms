const nodemailer = require("nodemailer")
const logger = require("./logger")

// Get email configuration from environment variables
const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.example.com"
const EMAIL_PORT = process.env.EMAIL_PORT || 587
const EMAIL_USER = process.env.EMAIL_USER || "user@example.com"
const EMAIL_PASS = process.env.EMAIL_PASS || "password"
const EMAIL_FROM = process.env.EMAIL_FROM || "no-reply@yourapp.com"
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000"

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_PORT === 465, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
})

/**
 * Send a password reset email
 *
 * @param {string} email - User's email address
 * @param {string} token - Reset token
 * @returns {Promise<boolean>} True if email was sent successfully
 */
const sendPasswordResetEmail = async (email, token) => {
  try {
    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV !== "production"

    // In development, log the reset link instead of sending an email
    if (isDevelopment) {
      logger.info(`[DEV MODE] Password reset link for ${email}: ${CLIENT_URL}/reset-password?token=${token}`)
      return true
    }

    // Create reset URL
    const resetUrl = `${CLIENT_URL}/reset-password?token=${token}`

    // Set up email options
    const mailOptions = {
      from: EMAIL_FROM,
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You requested a password reset for your account. Please click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
          </div>
          <p>If you didn't request this password reset, you can safely ignore this email.</p>
          <p>This link is valid for 1 hour.</p>
          <p>If the button above doesn't work, you can also copy and paste the following URL into your browser:</p>
          <p style="word-break: break-all;">${resetUrl}</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #777; font-size: 12px;">This is an automated email. Please do not reply to this message.</p>
        </div>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)
    logger.info(`Password reset email sent to ${email}`)

    return true
  } catch (error) {
    logger.error(`Failed to send password reset email to ${email}: ${error.message}`)
    return false
  }
}

module.exports = {
  sendPasswordResetEmail,
}


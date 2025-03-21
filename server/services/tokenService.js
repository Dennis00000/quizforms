const Redis = require("ioredis")
const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
})

const tokenService = {
  async revokeToken(token) {
    try {
      // Add token to blacklist with expiry
      await redis.set(`bl_${token}`, "1", "EX", 24 * 60 * 60) // 24 hours
    } catch (error) {
      console.error("Token revocation error:", error)
      throw error
    }
  },

  async isTokenRevoked(token) {
    try {
      return await redis.exists(`bl_${token}`)
    } catch (error) {
      console.error("Token check error:", error)
      return true // Fail secure
    }
  },
}

module.exports = tokenService


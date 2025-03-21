const { isTokenRevoked } = require("../services/tokenService")

const checkRevokedToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (token && (await isTokenRevoked(token))) {
      return res.status(401).json({ error: "Token has been revoked" })
    }

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { checkRevokedToken }


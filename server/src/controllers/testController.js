const { AppError } = require("../middleware/errorHandler")

class TestController {
  async publicTest(req, res, next) {
    try {
      res.json({
        status: "success",
        message: "Public test route works!",
      })
    } catch (error) {
      next(error)
    }
  }

  async protectedTest(req, res, next) {
    try {
      res.json({
        status: "success",
        message: "Protected test route works!",
        user: req.user,
      })
    } catch (error) {
      next(error)
    }
  }

  async adminTest(req, res, next) {
    try {
      if (req.user.role !== "admin") {
        throw new AppError("Not authorized - Admin only", 403)
      }

      res.json({
        status: "success",
        message: "Admin test route works!",
        user: req.user,
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new TestController()


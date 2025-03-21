const Joi = require("joi")
const { ValidationError } = require("./errorHandler")

/**
 * Validate request data against a schema
 * @param {Object} schema - Joi schema for validation
 * @param {string} source - Request property to validate ('body', 'query', 'params')
 * @returns {Function} Express middleware
 */
const validate = (schema, source = "body") => {
  return async (req, res, next) => {
    try {
      const data = req[source]
      const { error, value } = await schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      })

      if (error) {
        const details = error.details.reduce((acc, detail) => {
          const key = detail.path.join(".")
          acc[key] = detail.message
          return acc
        }, {})

        return next(new ValidationError("Validation failed", details))
      }

      // Replace request data with validated data
      req[source] = value
      next()
    } catch (err) {
      next(err)
    }
  }
}

module.exports = { validate }


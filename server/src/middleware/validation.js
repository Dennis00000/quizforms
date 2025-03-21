const Joi = require("joi")
const { AppError } = require("./errorHandler")

// Validation schemas
const schemas = {
  // Auth schemas
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  // Template schemas
  createTemplate: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).allow(""),
    topic: Joi.string().required(),
    is_public: Joi.boolean().default(true),
    tags: Joi.array().items(Joi.string()).default([]),
    questions: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().required(),
          type: Joi.string()
            .valid("string", "text", "number", "checkbox", "radio", "select", "date", "email", "phone", "url")
            .required(),
          description: Joi.string().allow(""),
          required: Joi.boolean().default(false),
          options: Joi.when("type", {
            is: Joi.string().valid("radio", "checkbox", "select"),
            then: Joi.array().items(Joi.string()).min(2).required(),
            otherwise: Joi.array().items(Joi.string()).default([]),
          }),
        }),
      )
      .default([]),
  }),

  // User schemas
  updateProfile: Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    bio: Joi.string().max(500).allow(""),
    avatar_url: Joi.string().uri().allow(""),
  }),

  changePassword: Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  }),
}

module.exports = {
  schemas,
}


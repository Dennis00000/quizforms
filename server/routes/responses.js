const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const Form = require("../models/Form")
const Response = require("../models/Response")

// Submit a response to a form
router.post("/:formId", async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId)

    if (!form) {
      return res.status(404).json({ message: "Form not found" })
    }

    const { answers, respondent } = req.body

    const newResponse = new Response({
      form: req.params.formId,
      answers,
      respondent,
    })

    const response = await newResponse.save()
    res.json(response)
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Form not found" })
    }
    res.status(500).send("Server Error")
  }
})

// Get all responses for a form
router.get("/form/:formId", auth, async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId)

    if (!form) {
      return res.status(404).json({ message: "Form not found" })
    }

    // Check if user owns the form
    if (form.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" })
    }

    const responses = await Response.find({ form: req.params.formId }).sort({ date: -1 })
    res.json(responses)
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Form not found" })
    }
    res.status(500).send("Server Error")
  }
})

module.exports = router


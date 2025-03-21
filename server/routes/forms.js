const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const Form = require("../models/Form")

// Get all forms
router.get("/", auth, async (req, res) => {
  try {
    const forms = await Form.find({ user: req.user.id }).sort({ date: -1 })
    res.json(forms)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// Create a form
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, questions } = req.body

    const newForm = new Form({
      title,
      description,
      questions,
      user: req.user.id,
    })

    const form = await newForm.save()
    res.json(form)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// Get form by ID
router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id)

    if (!form) {
      return res.status(404).json({ message: "Form not found" })
    }

    res.json(form)
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Form not found" })
    }
    res.status(500).send("Server Error")
  }
})

// Update form
router.put("/:id", auth, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id)

    if (!form) {
      return res.status(404).json({ message: "Form not found" })
    }

    // Check if user owns the form
    if (form.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" })
    }

    const { title, description, questions } = req.body

    form.title = title
    form.description = description
    form.questions = questions

    await form.save()

    res.json(form)
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Form not found" })
    }
    res.status(500).send("Server Error")
  }
})

// Delete form
router.delete("/:id", auth, async (req, res) => {
  try {
    const form = await Form.findById(req.params.id)

    if (!form) {
      return res.status(404).json({ message: "Form not found" })
    }

    // Check if user owns the form
    if (form.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" })
    }

    await form.remove()

    res.json({ message: "Form removed" })
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Form not found" })
    }
    res.status(500).send("Server Error")
  }
})

module.exports = router


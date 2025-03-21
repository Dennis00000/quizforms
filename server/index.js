const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Import routes
const authRoutes = require("./routes/auth")
const formsRoutes = require("./routes/forms")
const responsesRoutes = require("./routes/responses")

// Use routes
app.use("/api/auth", authRoutes)
app.use("/api/forms", formsRoutes)
app.use("/api/responses", responsesRoutes)

// Basic route
app.get("/", (req, res) => {
  res.send("QuizForm API is running")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


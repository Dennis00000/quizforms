const mongoose = require("mongoose")

const ResponseSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "form",
  },
  answers: [
    {
      questionId: {
        type: String,
        required: true,
      },
      answer: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    },
  ],
  respondent: {
    name: String,
    email: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("response", ResponseSchema)


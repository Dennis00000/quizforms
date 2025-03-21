const mongoose = require("mongoose")

const FormSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  questions: [
    {
      questionType: {
        type: String,
        required: true,
      },
      questionText: {
        type: String,
        required: true,
      },
      options: [String],
      required: {
        type: Boolean,
        default: false,
      },
      order: {
        type: Number,
      },
    },
  ],
  isPublished: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("form", FormSchema)


const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    weather: {
      type: String,
      enum: ["Sunny", "Cloudy", "Rainy", "Snowy", "Windy"],
      required: true,
    },
    temperature: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    environment: {
      type: String,
      enum: ["City", "Nature", "Beach", "Mountain", "Desert"],
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const Post = mongoose.model("Post", postSchema)

module.exports = Post

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    sellerUserId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: Array },
    sold: { type: Boolean, default: false },
    buyerUserId: { type: String },
    location: {
      state: {type: String, required: true},
      country: {type: String, required: true},
      continent: {type: String, required: true},
      coordinates: {
        lat: {type: String},
        lon: {type: String}
      },
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

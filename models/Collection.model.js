const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const collectionSchema = new Schema(
  {
    title: String,
    imageUrl: String,
    cardType: String,
    cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Collection", collectionSchema);

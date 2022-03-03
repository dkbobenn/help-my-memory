const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CardSchema = new Schema({
  title: String,
  description: String,
  fileUrl: String,
  username: String,
  password: String,
  cardType: String,
  theCollection: { type: Schema.Types.ObjectId, ref: "Collection" },
});

module.exports = model("Card", CardSchema);

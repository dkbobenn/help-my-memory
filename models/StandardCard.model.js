const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const standardCardSchema = new Schema({
  title: String,
  description: String,
  fileUrl: String,
  collection: { type: Schema.Types.ObjectId, ref: "Collection" }   // <-To store ids of other collections 
});

module.exports = model("Standardcard", standardCardSchema);

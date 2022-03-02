const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const passwordCardSchema = new Schema({
  username: String,
  password: String,
  description: String,
  collection: { type: Schema.Types.ObjectId, ref: "Collection" }, // <-To store ids of other collections
});

module.exports = model("Passwordcard", passwordCardSchema);

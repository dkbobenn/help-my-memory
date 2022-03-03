const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  collections: [{type: Schema.Types.ObjectId, ref: "Collections"}]
});

module.exports = model("User", userSchema);

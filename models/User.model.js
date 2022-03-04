const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  collections: [{type: Schema.Types.ObjectId, ref: "Collections"}] //will secure you can only see your own collections and not other users
});

module.exports = model("User", userSchema);

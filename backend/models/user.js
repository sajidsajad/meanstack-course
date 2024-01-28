const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//* unique is not a validator to avoid duplicate email addresses, rather we have a package for  that.

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please fill the name field"],
  },
  email: {
    type: String,
    required: [true, "field can't be empty"],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "Mobile number is required"],
  },
  username: {
    type: String,
    required: [true, "Userid should be filled"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password can't be empty"],
    min: 8,
  },
});

module.exports = mongoose.model.User || mongoose.model("User", userSchema);

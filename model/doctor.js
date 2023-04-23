const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  name: String,
  exp: Number,
  location: String,
  ratings: Number,
  profileImg: String,
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;

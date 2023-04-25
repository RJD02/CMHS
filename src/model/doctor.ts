const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  name: String,
  exp: Number,
  location: String,
  ratings: Number,
  profileImg: String,
  email: {
    type: String,
    unique: true,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;

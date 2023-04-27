const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    // required: true,
  },
  exp: {
    type: Number,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;

import { extendSchema } from "../utils/extendSchema";
import { userSchema } from "./user";
import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "someone",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
  },
  experience: {
    type: Number,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  teacherKey: {
    type: String,
    required: true,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;

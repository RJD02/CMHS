import { extendSchema } from "../utils/extendSchema";
import { userSchema } from "./user";

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    // required: true,
    type: String,
  },
  age: {
    // required: true,
    type: Number,
  },
  schoolName: {
    // required: true,
    type: String,
    default: "ABC, Solapur",
  },
  password: {
    required: true,
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parent",
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  isHealthy: {
    type: Boolean,
    default: true,
  },
  anxietyScore: {
    type: Number,
    default: 0,
  },
  depressionScore: {
    type: Number,
    default: 0,
  },
  stressScore: {
    type: Number,
    default: 0,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;

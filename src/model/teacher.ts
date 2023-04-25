import { extendSchema } from "../utils/extendSchema";
import { userSchema } from "./user";

const mongoose = require("mongoose");

const teacherSchema = extendSchema(userSchema, {
  schoolName: {
    type: String,
  },
  experience: {
    type: Number,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;

import mongoose from "mongoose";
import { extendSchema } from "../utils/extendSchema";
import { userSchema } from "./user";

const doctorSchema = extendSchema(userSchema, {
  experience: { type: Number },
  location: { type: String },
  ratings: { type: Number },
  profileImg: String,
  tags: { type: [String] },
  gender: { type: String },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;

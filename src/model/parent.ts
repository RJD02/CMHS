import mongoose from "mongoose";
import { extendSchema } from "../utils/extendSchema";
import { userSchema } from "./user";

// const parentSchema = extendSchema(userSchema, {
//   parentKey: { type: String, unique: true, required: true },
//   children: {
//     type: [{ child: mongoose.Schema.Types.ObjectId }],
//     ref: "Student",
//   },
// });

const parentSchema = new mongoose.Schema({
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
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  parentKey: {
    type: String,
    required: true,
  },
});

const Parent = mongoose.model("Parent", parentSchema);
export default Parent;

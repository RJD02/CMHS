import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
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
});

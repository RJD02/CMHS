import mongoose, { Schema } from "mongoose";

export const extendSchema = (
  schema: Schema,
  definition: any,
  options = null
) => {
  return new mongoose.Schema(
    Object.assign({}, schema.obj, definition),
    options
  );
};

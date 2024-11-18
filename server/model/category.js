import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  listed: {
    type: Boolean,
    default: true,
  },
});

export const Category = mongoose.model("Category", categorySchema);

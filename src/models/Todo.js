import mongoose from "mongoose";


const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "In Progress", "Completed"],
    },
    priority: {
      type: String,
      default: "Medium",
      enum: ["Low", "Medium", "High"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("todos", todoSchema, "todos");



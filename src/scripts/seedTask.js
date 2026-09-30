import mongoose from "mongoose";
import Project from "../models/Project.js";

// 🎯 100 dummy task names
const taskNames = Array.from({ length: 100 }, (_, i) => ({
  name: `Task ${i + 1}`,
}));

const insertDummyTasks = async () => {
  try {
    // ✅ connect DB (IMPORTANT — you missed this)
    await mongoose.connect("mongodb+srv://mousamcomfygen:sQIqjUrhgBv0G48k@cluster0.bvjx42r.mongodb.net/lms-3");

    await Project.deleteMany({});
    await Project.insertMany(taskNames);

    console.log("🎉 100 dummy tasks inserted successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting tasks:", error);
    process.exit(1);
  }
};

insertDummyTasks();
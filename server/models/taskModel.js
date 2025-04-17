const mongoose = require("mongoose");

const taskStructure = new mongoose.Schema(
  {
    taskTitle: { type: String, trim: true, required: true },
    taskDescription: { type: String, trim: true, required: true }, //unique:true
    taskDueDate: { type: String, required: true },
    taskUserId: { type: String, required: true },
    taskImgUrl: { type: String, required: true },
    taskImgId: { type: String, required: true },
    taskStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Running", "Completed"],
      required: true,
    },
    //
  },
  { timestamps: true }
);

module.exports = mongoose.model("taskCollection", taskStructure);

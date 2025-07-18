const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const ToDoModel = mongoose.model("todos", ToDoSchema);

module.exports = ToDoModel;

const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }]
});
const Todos = mongoose.model("Todo", todoSchema);
module.exports = Todos;

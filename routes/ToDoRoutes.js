const express = require("express");
const ToDoModel = require("../model/ToDoModel");
const ToDoRouter = express.Router();
const authMiddleware = require("../middleware/auth");

ToDoRouter.get(
  "/todos",
  authMiddleware(["user", "admin"]),
  async (req, res) => {
    try {
      const query = {};
      if (req.role == "user") {
        query.createdBy = req.userId;
      }
      const todo = await ToDoModel.find(query);
      res.status(200).json({ msg: "Success", todo: todo });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

ToDoRouter.post(
  "/todos",
  authMiddleware(["user", "admin"]),
  async (req, res) => {
    try {
      const newTodo = { ...req.body, createdBy: req.userId };
      const addData = await ToDoModel.create(newTodo);
      res.status(201).json({ msg: "todo added", addData });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

ToDoRouter.put(
  "/todos/:id",
  authMiddleware(["user", "admin"]),
  async (req, res) => {
    try {
      const userId = req.userId;
      const userTodo = await ToDoModel.findByIdAndUpdate(
        { _id: req.params.id, createdBy: userId },
        req.body,
        { new: true }
      );
      res.status(200).json({ msg: "todo updated", data: userTodo });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

ToDoRouter.delete(
  "/todos/:id",
  authMiddleware(["user", "admin"]),
  async (req, res) => {
    try {
      const userId = req.params;
      let findTodo = await ToDoModel.findByIdAndDelete({
        _id: req.params.id,
        createdBy: req.userId,
      });
      if (!findTodo) return res.status(404).json({ msg: "todo not found" });
      res.status(200).json({ msg: "Deleted successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

module.exports = ToDoRouter;

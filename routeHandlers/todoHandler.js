const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin");
const schema = require("../schema/schema");
const userSchema = require("../schema/userSchema");
const User = new mongoose.model("User", userSchema);
const Todo = new mongoose.model("Todo", schema);

router.get("/", checkLogin, async (req, res) => {
  var data;
  try {
    data = await Todo.find({})
      .populate("user", "name username -_id")
      .select({ _id: 0, date: 0 });
    res.status(200).send({ todos: data });
  } catch (error) {
    res.status(500).json({ error: "There was a server side problem" });
    console.log(error);
  }
});

router.get("/:id", checkLogin, async (req, res) => {
  var data;
  try {
    data = await Todo.find({ _id: req.params.id });
    res.status(200).send({ todos: data });
  } catch (error) {
    res.status(500).json({ error: "There was a server side problem" });
    console.log(error);
  }
});

router.post("/", checkLogin, async (req, res) => {
  const newTodo = new Todo({ ...req.body, user: req.userid });
  try {
    const todo = await newTodo.save();
    await User.updateOne({ _id: req.userid }, { $push: { todos: todo._id } });
    res.status(200).json({ message: "Insertion was successful" });
  } catch (error) {
    res.status(500).json({ error: "There was a server side problem" });
    console.log(error);
  }
});

router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({ message: "Insertions were successful" });
  } catch (error) {
    res.status(500).json({ error: "There was a server side problem" });
    console.log(error);
  }
});

router.put("/:id", checkLogin, async (req, res) => {
  var result;
  try {
    result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { status: "active" } },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({ message: "Update was successful" });
  } catch (error) {
    res.status(500).json({ error: "There was a server side problem" });
    console.log(error);
  }
  console.log(result);
});

router.delete("/:id", checkLogin, async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Deletion was successful" });
  } catch (error) {
    res.status(500).json({ error: "There was a server side problem" });
    console.log(error);
  }
});

module.exports = router;

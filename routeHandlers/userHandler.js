const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = express.Router();
const schema = require("../schema/userSchema");
const User = new mongoose.model("User", schema);

router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "Signup successful",
    });
  } catch (error) {
    res.status(500).json({
      error: "Signup failed",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const passwordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordValid) {
        const token = jwt.sign(
          {
            username: user.username,
            userid: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          accessToken: token,
          message: "Login successful",
        });
      } else {
        res.status(401).json({
          error: "Authentication failure",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failure",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was a server side problem",
    });
    console.log(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}).populate("todos");
    res.status(200).json({ data: users, message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was a server side problem" });
  }
});

module.exports = router;

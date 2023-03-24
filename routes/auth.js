const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  // check if the user exists in the database
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  // check if the password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  // create a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  // return the token and user information
  res.json({ token, user: { _id: user._id, username: user.username } });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  console.log(`Adding new user to db: ${req.body}`);

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(409).json({ error: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password.toString(), 10);

  const user = new User({
    username,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
});

module.exports = router;

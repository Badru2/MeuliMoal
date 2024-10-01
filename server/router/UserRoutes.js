const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

// get all users
router.get("/get", async (req, res) => {
  try {
    const users = await User.findAll(); // get all users

    res.status(200).json({ users, message: "Users found" }); // response with users
  } catch {
    res.status(500).json({ error, message: "Error getting users" }); // response with error
  }
});

// create user
router.post("/create", async (req, res) => {
  const { name, email, password } = req.body; // get data from client

  const hashedPassword = bcrypt.hashSync(password, 10); // hash password

  try {
    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User created", user }); // response with user
  } catch (error) {
    res.status(500).json({ error, message: "Error creating user" }); // response with error
  }
});

module.exports = router; // export router

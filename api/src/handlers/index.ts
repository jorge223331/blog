const express = require("express");
const router = express.Router();
const {
  User,
  UserInsertable,
  updateUser,
  deleteUser,
} = require("../models/User.js");

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

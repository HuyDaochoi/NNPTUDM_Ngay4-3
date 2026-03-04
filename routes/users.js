const express = require("express");
const router = express.Router();
const { dataUser, dataRole } = require("../utils/data");

// GET all users
router.get("/", (req, res) => {
  res.json(dataUser);
});

// GET user by username
router.get("/:username", (req, res) => {
  const user = dataUser.find(u => u.username === req.params.username);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

// CREATE user
router.post("/", (req, res) => {
  const role = dataRole.find(r => r.id === req.body.roleId);
  if (!role) return res.status(400).json({ message: "Invalid roleId" });

  const newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    status: req.body.status,
    loginCount: 0,
    role: role,
    creationAt: new Date(),
    updatedAt: new Date()
  };

  dataUser.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE user
router.put("/:username", (req, res) => {
  const user = dataUser.find(u => u.username === req.params.username);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.email = req.body.email || user.email;
  user.fullName = req.body.fullName || user.fullName;
  user.status = req.body.status ?? user.status;
  user.updatedAt = new Date();

  res.json(user);
});

// DELETE user
router.delete("/:username", (req, res) => {
  const index = dataUser.findIndex(u => u.username === req.params.username);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  dataUser.splice(index, 1);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
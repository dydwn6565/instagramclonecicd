const express = require("express");
const router = express.Router();

const userRepo = require("../repos/user-repo");
const bcrypt = require("bcrypt");
const authorization = require("../middleware/authorization");
const { validationResult } = require("express-validator");

router.post("/", authorization, (req, res) => {
  res.json({ message: "token is valid" });
});

router.get("/", (req, res) => {
  res.json({ message: "Hello " });
});
router.get("/users", async (req, res) => {
  const users = await userRepo.find();
  res.status(201).json({ users });
});
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await userRepo.findById(id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

router.get("/usersByUserId/:id", async (req, res) => {
  const { id } = req.params;

  const user = await userRepo.findByuserId(id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});
router.post("/users", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { userid, name, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const successPost = await userRepo.insert(
    userid,
    name,
    username,
    hashedPassword
  );
  if (successPost) {
    res.status(201).json("User is created");
  } else {
    res.status(500).json({ message: "User is not created" });
  }
});
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { userId, name, password, username, bio, avatar, status } = req.body;

  const user = await userRepo.update(
    id,
    userId,
    name,
    password,
    username,
    bio,
    avatar,
    status
  );

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await userRepo.delete(id);

  if (user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;

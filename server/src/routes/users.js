import express from "express";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bycrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  const user = await UserModel.findOne({ username });
  
  const token = jwt.sign({ id: user.id }, "secret");
  if (token) {
    return res.json({ token, userID: user.id });
  }


  return res.json({ user });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "USER DOESN'T, EXIST" });
  }
  const isPasswordValid = await bycrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "password is not correct" });
  }

  const token = jwt.sign({ id: user.id }, "secret");
  if (token) {
    return res.json({ token, userID: user.id });
  }

  return res.json({ user });
});

export { router as userRouter };

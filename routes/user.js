const { Router } = require("express");
const { ModifiedPathsSnapshot } = require("mongoose");

const User = require("../models/user");

const userRouter = Router();

userRouter.get("/signin", (req, res) => {
  return res.render("signin");
});

userRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.matchPassword(email, password);

  console.log("User", user);

  return res.redirect("/");
});

userRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/");
});

module.exports = userRouter;

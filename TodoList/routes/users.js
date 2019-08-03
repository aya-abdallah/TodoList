const express = require("express");
const userRouter = express.Router();
const User = require("../models/users");

userRouter.get("/", (req, res) => {
  res.redirect("/users");
});
userRouter.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        throw new Error("no user with that email");
      }
      res.json(user);
    })
    .catch(err => {
        res.status(400).send("user not found");
    });
});

userRouter.post("/signup", (req, res) => {
  // console.log("save user... ")
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  newUser
    .save()
    .then(() => res.json("Server added successfully"))
    .catch((err)=>res.status(400).send("unable to save to database"));
});
module.exports = userRouter;

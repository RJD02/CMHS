const express = require("express");
const Student = require("../model/student");
const Teacher = require("../model/teacher");
const Doctor = require("../model/doctor");
const Router = express.Router();

const STUDENT = "STUDENT";
const TEACHER = "TEACHER";
const DOCTOR = "DOCTOR";

Router.post("/login", async (req, res) => {
  const { username, password, type, email } = req.body;
  console.log(req.body);
  try {
    // see if user exists
    let user = null;
    if (type === STUDENT) {
      user = await Student.findOne({ email });
    } else if (type === TEACHER) {
      user = await Teacher.findOne({ email });
    } else {
      user = await Doctor.findOne({ email });
    }
    console.log(user);
    if (user === null) {
      return res.status(404).json({ message: "User not found, maybe signup?" });
    }
    if (user.password != password) {
      return res.status(401).json({ message: "Passwords don't match" });
    }
    return res.status(200).json({ message: "Successfully logged in" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

Router.post("/signup", async (req, res) => {
  const { username, password, type, email } = req.body;
  console.log(req.body);
  try {
    // ensure there is no user
    let user = null;
    if (type === STUDENT) {
      user = await Student.findOne({ email });
    } else if (type === TEACHER) {
      user = await Teacher.findOne({ email });
    } else {
      user = await Doctor.findOne({ email });
    }
    if (user != null)
      return res.status(200).json({ message: "email already exists" });
    let newUser = null;
    if (type === STUDENT) {
      newUser = await Student({
        username,
        password,
        email,
      });
      await newUser.save();
    } else if (type === DOCTOR) {
      newUser = await Doctor({
        username,
        password,
        email,
      });
      await newUser.save();
    } else if (type === TEACHER) {
      newUser = await Teacher({
        username,
        password,
        email,
      });
      await newUser.save();
    }
    return res.status(200).json({ message: "New user created", user: newUser });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = Router;

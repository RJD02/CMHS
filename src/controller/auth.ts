import { Request, Response } from "express";
import Student from "../model/student";
import Doctor from "../model/doctor";
import Teacher from "../model/teacher";
import { Roles } from "../utils/types";
import { checkPassword, hashPassword } from "../utils/hashing";
import jwt from "jsonwebtoken";

export const loginController = async (req: Request, res: Response) => {
  const { username, password, type, email } = req.body;
  console.log(req.body);
  try {
    // see if user exists
    let user = null;
    if (type === Roles.STUDENT) {
      user = await Student.findOne({ email });
    } else if (type === Roles.TEACHER) {
      user = await Teacher.findOne({ email });
    } else {
      user = await Doctor.findOne({ email });
    }
    console.log(user);
    if (user === null) {
      return res.status(404).json({ message: "User not found, maybe signup?" });
    }
    if (!checkPassword(password, user.password)) {
      return res.status(401).json({ message: "Passwords don't match" });
    }
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    await user.save();
    return res.status(200).json({ message: "Successfully logged in", user });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signupController = async (req: Request, res: Response) => {
  const { username, password, type, email, name } = req.body;
  console.log(req.body);
  try {
    // ensure there is no user
    let user = null;
    if (type === Roles.STUDENT) {
      user = await Student.findOne({ email });
    } else if (type === Roles.TEACHER) {
      user = await Teacher.findOne({ email });
    } else {
      user = await Doctor.findOne({ email });
    }
    if (user != null)
      return res.status(200).json({ message: "email already exists" });
    let newUser = null;
    if (!password || !email || !type || !name)
      return res.status(402).json({ message: "please fill all credentials" });
    const encryptedPassword = hashPassword(password);
    if (type === Roles.STUDENT) {
      newUser = await new Student({
        username,
        password: encryptedPassword,
        email,
        name,
      });
    } else if (type === Roles.DOCTOR) {
      newUser = await new Doctor({
        username,
        password: encryptedPassword,
        email,
        name,
      });
    } else if (type === Roles.TEACHER) {
      newUser = await new Teacher({
        username,
        password: encryptedPassword,
        email,
        name,
      });
    }
    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    newUser.token = token;
    await newUser.save();
    return res.status(200).json({ message: "New user created", user: newUser });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const protectedController = async (req: Request, res: Response) => {
  console.log("Welcome");
  return res.status(200).json({ message: "authenticated" });
};

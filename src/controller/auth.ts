import Parent from "./../model/parent";
import { Request, Response } from "express";
import Student from "../model/student";
import Doctor from "../model/doctor";
import Teacher from "../model/teacher";
import { Roles } from "../utils/types";
import { checkPassword, hashPassword } from "../utils/hashing";
import jwt from "jsonwebtoken";
import { UniqueOTP } from "../utils/parentKeyGenerator";
import { Document } from "mongoose";

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
    } else if (type === Roles.DOCTOR) {
      user = await Doctor.findOne({ email });
    } else if (type === Roles.PARENT) {
      user = await Parent.findOne({ email });
    }
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found, maybe signup?" });
    }
    if (user && !checkPassword(password, user.password)) {
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
  const { username, password, type, email, name, parentKey, teacherKey } =
    req.body;
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

    if (!password || !email || !type || !name)
      return res.status(402).json({ message: "please fill all credentials" });
    const encryptedPassword = hashPassword(password);
    let newUser = null;
    if (type === Roles.STUDENT) {
      if (!parentKey || !teacherKey)
        return res
          .status(401)
          .json({ message: "Parent/Teacher code is required" });
      const parent = await Parent.findOne({ parentKey });
      const teacher = await Teacher.findOne({ teacherKey });
      if (!parent || !teacher)
        return res
          .status(403)
          .json({ message: "No parent/teacher with that parent code exists" });
      newUser = new Student({
        username,
        password: encryptedPassword,
        email,
        name,
      });

      if (!newUser)
        return res.status(500).json({ message: "something went wrong" });
      newUser.parent = parent._id;
      newUser.teacher = teacher._id;
      await newUser.save();
      parent.children.push(newUser._id);
      teacher.students.push(newUser._id);
      await teacher.save();
      await parent.save();
    } else if (type === Roles.DOCTOR) {
      newUser = await new Doctor({
        username,
        password: encryptedPassword,
        email,
        name,
      });
    } else if (type === Roles.TEACHER) {
      const teacherKey = UniqueOTP(10);
      newUser = await new Teacher({
        username,
        password: encryptedPassword,
        email,
        name,
        teacherKey,
      });
    } else if (type === Roles.PARENT) {
      const parentKey = UniqueOTP(10);
      newUser = new Parent({
        username,
        password: encryptedPassword,
        email,
        name,
        parentKey,
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

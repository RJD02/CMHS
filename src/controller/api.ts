import { Request, Response } from "express";
import Teacher from "../model/teacher";
import Parent from "../model/parent";

const teacherDetails = async (req: Request, res: Response) => {
  const { email, userId } = req.body;
  if (!email || !userId)
    return res.status(403).json({ message: "Email and userId required" });
  try {
    const teacher = await (await Teacher.findById(userId)).populate("students");
    if (!teacher)
      return res.status(401).json({ message: "No teacher with this id found" });
    return res.status(200).json({ message: "Found teacher", teacher });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const parentDetails = async (req: Request, res: Response) => {
  const { email, userId } = req.body;
  if (!email || !userId)
    return res.status(403).json({ message: "Email and userId required" });
  try {
    const parent = await (await Parent.findById(userId)).populate("children");
    if (!parent)
      return res.status(403).json({ message: "No parent with this id found" });
    return res.status(200).json({ message: "Found parent", parent });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const apiController = { teacherDetails, parentDetails };

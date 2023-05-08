import { Request, Response } from "express";
import Teacher from "../model/teacher";
import Parent from "../model/parent";
import { Roles } from "../utils/types";
import Doctor from "../model/doctor";

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

const analyzeScore = async (req: Request | any, res: Response) => {
  const { type, depressionScore, anxietyScore, stressScore, email, userId } =
    req.body;
  const user = req.user;
  if (user.type != Roles.STUDENT && type != Roles.STUDENT)
    return res
      .status(403)
      .json({ message: "Only students can access this page" });

  if (depressionScore === 10 || depressionScore > 5) {
    if (anxietyScore === 10 || anxietyScore > 5) {
      if (stressScore === 10 || stressScore > 5) {
        const doctorsList = await Doctor.find({
          tag: { $in: ["depression", "anxiety", "stress"] },
        });
        return res.status(200).json({
          message: "You have high levels of all three abnormalities",
          doctorsList,
        });
      } else {
        const doctorsList = await Doctor.find({
          tag: { $in: ["depression", "anxiety"] },
        });
        return res.status(200).json({
          message: "You have high levels of depression and anxiety",
          doctorsList,
        });
      }
    } else {
      if (stressScore === 10 || stressScore > 5) {
        const doctorList = await Doctor.find({
          tag: { $in: ["depression", "stress"] },
        });
        return res
          .status(200)
          .json({
            message: "You have high levels of depression and stress",
            doctorList,
          });
      }
    }
  } else {
    if (anxietyScore === 10 || anxietyScore > 5) {
      if (stressScore === 10 || stressScore > 5) {
        const doctorList = await Doctor.find({
          tag: { $in: ["anxiety", "stress"] },
        });
        return res
          .status(200)
          .json({
            message: "You have high levels of anxiety and stress",
            doctorList,
          });
      } else {
        const doctorList = await Doctor.find({ tag: { $in: ["anxiety"] } });
        return res
          .status(200)
          .json({ message: "You have high level of anxiety", doctorList });
      }
    } else {
      return res
        .status(200)
        .json({
          message:
            "You have perfectly normal personality. You don't need a doctor",
        });
    }
  }
};

export const apiController = { teacherDetails, parentDetails, analyzeScore };

import { Request, Response } from "express";
import Teacher from "../model/teacher";
import Parent from "../model/parent";
import { Roles } from "../utils/types";
import Doctor from "../model/doctor";
import Student from "../model/student";

const teacherDetails = async (req: Request, res: Response) => {
  const { email, userId } = req.body;
  console.log(email, userId)
  if (!email || !userId)
    return res.status(403).json({ message: "Email and userId required" });
  try {
    const teacher =  (await Teacher.findById(userId));
    console.log(teacher)
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
  console.log(email, userId);
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

  const student = await Student.findOne({ email: user.email }).populate(
    "parent"
  );
  student.anxietyScore = anxietyScore;
  student.depressionScore = depressionScore;
  student.stressScore = stressScore;
  const parent = student.parent;
  console.log("parent", parent);
  if (depressionScore === 10 || depressionScore > 5) {
    student.isHealthy = false;
    await student.save();
    if (anxietyScore === 10 || anxietyScore > 5) {
      if (stressScore === 10 || stressScore > 5) {
        const doctorsList = await Doctor.find({
          tags: { $in: ["depression", "anxiety", "stress"] },
        });

        return res.status(200).json({
          message: "You have high levels of all three abnormalities",
          doctorsList,
        });
      } else {
        const doctorsList = await Doctor.find({
          tags: { $in: ["depression", "anxiety"] },
        });
        return res.status(200).json({
          message: "You have high levels of depression and anxiety",
          doctorsList,
        });
      }
    } else {
      if (stressScore === 10 || stressScore > 5) {
        const doctorList = await Doctor.find({
          tags: { $in: ["depression", "stress"] },
        });
        return res.status(200).json({
          message: "You have high levels of depression and stress",
          doctorList,
        });
      }
    }
  } else {
    if (anxietyScore === 10 || anxietyScore > 5) {
      student.isHealthy = false;
      await student.save();
      if (stressScore === 10 || stressScore > 5) {
        const doctorList = await Doctor.find({
          tags: { $in: ["anxiety", "stress"] },
        });
        return res.status(200).json({
          message: "You have high levels of anxiety and stress",
          doctorList,
        });
      } else {
        const doctorList = await Doctor.find({ tags: { $in: ["anxiety"] } });
        return res
          .status(200)
          .json({ message: "You have high level of anxiety", doctorList });
      }
    } else {
      student.isHealthy = true;
      await student.save();
      return res.status(200).json({
        message:
          "You have perfectly normal personality. You don't need a doctor",
      });
    }
  }
};

const getDoctor = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "id is required" });
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "No doctor found" });
    }
    return res.status(200).json({ doctor });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find({});
    if (!doctors) {
      return res.status(200).json({ message: "No doctors in db" });
    }
    return res.status(200).json({ doctors });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const apiController = {
  teacherDetails,
  parentDetails,
  analyzeScore,
  getDoctor,
  getDoctors,
};

import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";

import mongoose from "mongoose";

import Doctor from "./model/doctor";

import authRoutes from "./routes/auth";
import { Request, Response } from "express";
import { checkPassword, hashPassword } from "./utils/hashing";

console.log(hashPassword("hello world"));

const app = express();
mongoose
  .connect(
    `mongodb+srv://admin-raviraj:${process.env.MONGODB_PASSWORD}@cluster0.lkxsz.mongodb.net/zaid?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((err: Error) => {
    console.log("Oh no! Mongo connection error");
    console.log(err);
  });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

const asyncWrapper = async (fn: Function) => {
  try {
    return fn;
  } catch (e) {
    console.log(e);
  }
};

app.use("/auth", authRoutes);

app.post("/api/doctor", async (req: Request, res: Response) => {
  const { name, exp, location, ratings, profileImg } = req.body;
  console.log(req.body);
  try {
    const newDoc = new Doctor({
      name,
      exp,
      location,
      ratings,
      profileImg,
    });
    await newDoc.save();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.get("/api/doctor", async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find();
    console.log(doctors);
    res.send({ doctors });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.get("/api/doctor/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      res.send({ msg: "No doctor of that id" });
    } else {
      res.send({ doctor });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.post("/api/doctor/search", async (req: Request, res: Response) => {
  const { keyword } = req.body;
  console.log(req.body);
  try {
    const doctor = await Doctor.find({ name: { $regex: `${keyword}` } });
    if (!doctor) {
      res.send({ msg: "No doctor with that name" });
    } else {
      res.send({ doctor });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.listen("8000", () => console.log("listening on port 8000"));

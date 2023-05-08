import express from "express";
import { apiController } from "../controller/api";
import { verifyToken } from "../middleware/auth";

export const apiRouter = express.Router();

apiRouter.post("/teacher/detail", verifyToken, apiController.teacherDetails);

apiRouter.post("/parent/detail", verifyToken, apiController.parentDetails);

apiRouter.post("/student/score", verifyToken, apiController.analyzeScore);

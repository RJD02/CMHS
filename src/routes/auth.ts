import {
  loginController,
  signupController,
  protectedController,
} from "../controller/auth";

import express from "express";
import { verifyToken } from "../middleware/auth";
const Router = express.Router();

Router.post("/login", loginController);

Router.post("/signup", signupController);

Router.get("/protected", verifyToken, protectedController);

export default Router;

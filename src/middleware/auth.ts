import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const config = process.env;

export const verifyToken = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token" });
  }
  return next();
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = process.env;
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res
            .status(403)
            .json({ message: "A token is required for authentication" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Invalid token" });
    }
    return next();
};
exports.verifyToken = verifyToken;

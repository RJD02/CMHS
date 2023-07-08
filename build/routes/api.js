"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const api_1 = require("../controller/api");
const auth_1 = require("../middleware/auth");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.post("/teacher/detail", auth_1.verifyToken, api_1.apiController.teacherDetails);
exports.apiRouter.post("/parent/detail", auth_1.verifyToken, api_1.apiController.parentDetails);
exports.apiRouter.post("/student/score", auth_1.verifyToken, api_1.apiController.analyzeScore);
exports.apiRouter.get("/doctors", api_1.apiController.getDoctors);
exports.apiRouter.get("/doctor/:id", api_1.apiController.getDoctor);

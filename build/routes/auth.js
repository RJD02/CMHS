"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controller/auth");
const express_1 = __importDefault(require("express"));
const auth_2 = require("../middleware/auth");
const Router = express_1.default.Router();
Router.post("/login", auth_1.loginController);
Router.post("/signup", auth_1.signupController);
Router.get("/protected", auth_2.verifyToken, auth_1.protectedController);
exports.default = Router;

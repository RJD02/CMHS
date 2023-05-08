"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const extendSchema_1 = require("../utils/extendSchema");
const user_1 = require("./user");
const doctorSchema = (0, extendSchema_1.extendSchema)(user_1.userSchema, {
    experience: { type: Number },
    location: { type: String },
    ratings: { type: Number },
    profileImg: String,
});
const Doctor = mongoose_1.default.model("Doctor", doctorSchema);
exports.default = Doctor;

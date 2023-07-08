"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    name: {
        // required: true,
        type: String,
    },
    age: {
        // required: true,
        type: Number,
    },
    schoolName: {
        // required: true,
        type: String,
        default: "ABC, Solapur",
    },
    password: {
        required: true,
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    parent: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Parent",
    },
    teacher: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    isHealthy: {
        type: Boolean,
        default: true,
    },
    anxietyScore: {
        type: Number,
        default: 0,
    },
    depressionScore: {
        type: Number,
        default: 0,
    },
    stressScore: {
        type: Number,
        default: 0,
    },
});
const Student = mongoose_1.default.model("Student", studentSchema);
exports.default = Student;

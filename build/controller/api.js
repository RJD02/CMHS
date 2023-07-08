"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiController = void 0;
const teacher_1 = __importDefault(require("../model/teacher"));
const parent_1 = __importDefault(require("../model/parent"));
const types_1 = require("../utils/types");
const doctor_1 = __importDefault(require("../model/doctor"));
const student_1 = __importDefault(require("../model/student"));
const teacherDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userId } = req.body;
    console.log(email, userId);
    if (!email || !userId)
        return res.status(403).json({ message: "Email and userId required" });
    try {
        const teacher = (yield teacher_1.default.findById(userId));
        console.log(teacher);
        if (!teacher)
            return res.status(401).json({ message: "No teacher with this id found" });
        return res.status(200).json({ message: "Found teacher", teacher });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const parentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userId } = req.body;
    console.log(email, userId);
    if (!email || !userId)
        return res.status(403).json({ message: "Email and userId required" });
    try {
        const parent = yield (yield parent_1.default.findById(userId)).populate("children");
        if (!parent)
            return res.status(403).json({ message: "No parent with this id found" });
        return res.status(200).json({ message: "Found parent", parent });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
const analyzeScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, depressionScore, anxietyScore, stressScore, email, userId } = req.body;
    const user = req.user;
    if (user.type != types_1.Roles.STUDENT && type != types_1.Roles.STUDENT)
        return res
            .status(403)
            .json({ message: "Only students can access this page" });
    const student = yield student_1.default.findOne({ email: user.email }).populate("parent");
    student.anxietyScore = anxietyScore;
    student.depressionScore = depressionScore;
    student.stressScore = stressScore;
    const parent = student.parent;
    console.log("parent", parent);
    if (depressionScore === 10 || depressionScore > 5) {
        student.isHealthy = false;
        yield student.save();
        if (anxietyScore === 10 || anxietyScore > 5) {
            if (stressScore === 10 || stressScore > 5) {
                const doctorsList = yield doctor_1.default.find({
                    tags: { $in: ["depression", "anxiety", "stress"] },
                });
                return res.status(200).json({
                    message: "You have high levels of all three abnormalities",
                    doctorsList,
                });
            }
            else {
                const doctorsList = yield doctor_1.default.find({
                    tags: { $in: ["depression", "anxiety"] },
                });
                return res.status(200).json({
                    message: "You have high levels of depression and anxiety",
                    doctorsList,
                });
            }
        }
        else {
            if (stressScore === 10 || stressScore > 5) {
                const doctorList = yield doctor_1.default.find({
                    tags: { $in: ["depression", "stress"] },
                });
                return res.status(200).json({
                    message: "You have high levels of depression and stress",
                    doctorList,
                });
            }
        }
    }
    else {
        if (anxietyScore === 10 || anxietyScore > 5) {
            student.isHealthy = false;
            yield student.save();
            if (stressScore === 10 || stressScore > 5) {
                const doctorList = yield doctor_1.default.find({
                    tags: { $in: ["anxiety", "stress"] },
                });
                return res.status(200).json({
                    message: "You have high levels of anxiety and stress",
                    doctorList,
                });
            }
            else {
                const doctorList = yield doctor_1.default.find({ tags: { $in: ["anxiety"] } });
                return res
                    .status(200)
                    .json({ message: "You have high level of anxiety", doctorList });
            }
        }
        else {
            student.isHealthy = true;
            yield student.save();
            return res.status(200).json({
                message: "You have perfectly normal personality. You don't need a doctor",
            });
        }
    }
});
const getDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ message: "id is required" });
    try {
        const doctor = yield doctor_1.default.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: "No doctor found" });
        }
        return res.status(200).json({ doctor });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
});
const getDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctor_1.default.find({});
        if (!doctors) {
            return res.status(200).json({ message: "No doctors in db" });
        }
        return res.status(200).json({ doctors });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.apiController = {
    teacherDetails,
    parentDetails,
    analyzeScore,
    getDoctor,
    getDoctors,
};

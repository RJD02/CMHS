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
exports.protectedController = exports.signupController = exports.loginController = void 0;
const parent_1 = __importDefault(require("./../model/parent"));
const student_1 = __importDefault(require("../model/student"));
const doctor_1 = __importDefault(require("../model/doctor"));
const teacher_1 = __importDefault(require("../model/teacher"));
const types_1 = require("../utils/types");
const hashing_1 = require("../utils/hashing");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const parentKeyGenerator_1 = require("../utils/parentKeyGenerator");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, type, email } = req.body;
    console.log(req.body);
    try {
        // see if user exists
        let user = null;
        if (type === types_1.Roles.STUDENT) {
            user = yield student_1.default.findOne({ email });
        }
        else if (type === types_1.Roles.TEACHER) {
            user = yield teacher_1.default.findOne({ email });
        }
        else if (type === types_1.Roles.DOCTOR) {
            user = yield doctor_1.default.findOne({ email });
        }
        else if (type === types_1.Roles.PARENT) {
            user = yield parent_1.default.findOne({ email });
        }
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found, maybe signup?" });
        }
        if (user && !(0, hashing_1.checkPassword)(password, user.password)) {
            return res.status(401).json({ message: "Passwords don't match" });
        }
        const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
        });
        console.log(token);
        user.token = token;
        yield user.save();
        console.log(user.token);
        return res
            .status(200)
            .json({ message: "Successfully logged in", user, token });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.loginController = loginController;
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, type, email, name, parentKey, teacherKey, tags } = req.body;
    console.log(req.body);
    try {
        // ensure there is no user
        let user = null;
        if (type === types_1.Roles.STUDENT) {
            user = yield student_1.default.findOne({ email });
        }
        else if (type === types_1.Roles.TEACHER) {
            user = yield teacher_1.default.findOne({ email });
        }
        else {
            user = yield doctor_1.default.findOne({ email });
        }
        if (user != null)
            return res.status(200).json({ message: "email already exists" });
        if (!password || !email || !type || !name)
            return res.status(402).json({ message: "please fill all credentials" });
        const encryptedPassword = (0, hashing_1.hashPassword)(password);
        let newUser = null;
        if (type === types_1.Roles.STUDENT) {
            if (!parentKey || !teacherKey)
                return res
                    .status(401)
                    .json({ message: "Parent/Teacher code is required" });
            const parent = yield parent_1.default.findOne({ parentKey });
            const teacher = yield teacher_1.default.findOne({ teacherKey });
            if (!parent || !teacher)
                return res
                    .status(403)
                    .json({ message: "No parent/teacher with that parent code exists" });
            newUser = new student_1.default({
                username,
                password: encryptedPassword,
                email,
                name,
            });
            if (!newUser)
                return res.status(500).json({ message: "something went wrong" });
            newUser.parent = parent._id;
            newUser.teacher = teacher._id;
            yield newUser.save();
            parent.children.push(newUser._id);
            teacher.students.push(newUser._id);
            yield teacher.save();
            yield parent.save();
        }
        else if (type === types_1.Roles.DOCTOR) {
            if (!tags || tags.length === 0) {
                return res.status(200).json({ message: "Add some tags" });
            }
            newUser = new doctor_1.default({
                username,
                password: encryptedPassword,
                email,
                name,
                tags,
            });
        }
        else if (type === types_1.Roles.TEACHER) {
            const teacherKey = (0, parentKeyGenerator_1.UniqueOTP)(10);
            newUser = new teacher_1.default({
                username,
                password: encryptedPassword,
                email,
                name,
                teacherKey,
            });
        }
        else if (type === types_1.Roles.PARENT) {
            const parentKey = (0, parentKeyGenerator_1.UniqueOTP)(10);
            newUser = new parent_1.default({
                username,
                password: encryptedPassword,
                email,
                name,
                parentKey,
            });
        }
        else {
            return res.status(404).json({ message: "type not defined" });
        }
        const token = jsonwebtoken_1.default.sign({ user_id: newUser._id, email }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
        });
        newUser.token = token;
        yield newUser.save();
        return res
            .status(200)
            .json({ message: "New user created", user: newUser, token });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.signupController = signupController;
const protectedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Welcome");
    return res.status(200).json({ message: "authenticated" });
});
exports.protectedController = protectedController;

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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const doctor_1 = __importDefault(require("./model/doctor"));
const auth_1 = __importDefault(require("./routes/auth"));
const hashing_1 = require("./utils/hashing");
const api_1 = require("./routes/api");
console.log((0, hashing_1.hashPassword)("hello world"));
const app = (0, express_1.default)();
mongoose_1.default
    .connect(`mongodb+srv://admin-raviraj:${process.env.MONGODB_PASSWORD}@cluster0.lkxsz.mongodb.net/zaid?retryWrites=true&w=majority`)
    .then(() => {
    console.log("MONGO CONNECTION OPEN");
})
    .catch((err) => {
    console.log("Oh no! Mongo connection error");
    console.log(err);
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use("/auth", auth_1.default);
app.use("/api", api_1.apiRouter);
app.post("/api/doctor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, exp, location, ratings, profileImg } = req.body;
    console.log(req.body);
    try {
        const newDoc = new doctor_1.default({
            name,
            exp,
            location,
            ratings,
            profileImg,
        });
        yield newDoc.save();
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}));
app.get("/api/doctor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctor_1.default.find();
        console.log(doctors);
        res.send({ doctors });
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}));
app.get("/api/doctor/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const doctor = yield doctor_1.default.findById(id);
        if (!doctor) {
            res.send({ msg: "No doctor of that id" });
        }
        else {
            res.send({ doctor });
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}));
app.post("/api/doctor/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.body;
    console.log(req.body);
    try {
        const doctor = yield doctor_1.default.find({ name: { $regex: `${keyword}` } });
        if (!doctor) {
            res.send({ msg: "No doctor with that name" });
        }
        else {
            res.send({ doctor });
        }
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}));
app.listen("8000", () => console.log("listening on port 8000"));

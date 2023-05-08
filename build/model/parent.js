"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const parentSchema = extendSchema(userSchema, {
//   parentKey: { type: String, unique: true, required: true },
//   children: {
//     type: [{ child: mongoose.Schema.Types.ObjectId }],
//     ref: "Student",
//   },
// });
const parentSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        default: "someone",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    children: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
    parentKey: {
        type: String,
        required: true,
    },
});
const Parent = mongoose_1.default.model("Parent", parentSchema);
exports.default = Parent;

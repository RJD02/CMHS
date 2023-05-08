"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 12;
const myPlainTextPassword = "hello world";
const someOtherPlainTextPassword = "hey";
const hashPassword = (plainTextPassword) => {
    // bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
    //     if(err) return [null, err];
    //     return [hash, null];
    // })
    const hashedPassword = bcrypt_1.default.hashSync(plainTextPassword, saltRounds);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const checkPassword = (plainTextPassword, hashedPassword) => {
    const match = bcrypt_1.default.compareSync(plainTextPassword, hashedPassword);
    if (match)
        return true;
    return false;
};
exports.checkPassword = checkPassword;

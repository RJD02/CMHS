"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEXColor = exports.UniqueCharOTP = exports.UniqueOTP = exports.UniqueNumberId = exports.UniqueStringId = exports.UniqueNumber = exports.UniqueString = exports.RandomNumber = void 0;
// const { Base64 } = require("js-base64");
const js_base64_1 = require("js-base64");
// const uuid = require("uuid");
// Random Number Generator
const RandomNumber = () => Math.floor(Math.random() * 1000) + 1;
exports.RandomNumber = RandomNumber;
// Basically This is Return Encoding in Base64 of RandomNumber(1-1000)+"_"+CurrentTimeInMilliSecond +"_"+RandomNumber(1-1000)
const UniqueString = () => js_base64_1.Base64.encode(`${(0, exports.RandomNumber)()}_${Date.now()}_${(0, exports.RandomNumber)()}`);
exports.UniqueString = UniqueString;
// Basically This is Return RandomNumber(1-1000)+CurrentTimeInMilliSecond+RandomNumber(1-1000)
const UniqueNumber = () => `${(0, exports.RandomNumber)()}${Date.now()}${(0, exports.RandomNumber)()}`;
exports.UniqueNumber = UniqueNumber;
// Basically This is Return Encoding in Base64 of RandomNumber(1-1000)+"-"+Encoding in Base64 of CurrentTimeInMilliSecond +"-"+Encoding in Base64 of RandomNumber(1-1000)
const UniqueStringId = () => js_base64_1.Base64.encode(`${(0, exports.RandomNumber)()}`) +
    "-" +
    js_base64_1.Base64.encode(`${Date.now()}`) +
    "-" +
    js_base64_1.Base64.encode(`${(0, exports.RandomNumber)()}`);
exports.UniqueStringId = UniqueStringId;
// Basically This is Return RandomNumber(1-1000)+"-"+CurrentTimeInMilliSecond +"-"+RandomNumber(1-1000)
const UniqueNumberId = () => `${(0, exports.RandomNumber)()}-${Date.now()}-${(0, exports.RandomNumber)()}`;
exports.UniqueNumberId = UniqueNumberId;
// Generate Number OTP
const UniqueOTP = (length = 6) => Math.floor(Math.random() * (Math.pow(10, length) - 1 - Math.pow(10, length - 1) + 1)) + Math.pow(10, length - 1);
exports.UniqueOTP = UniqueOTP;
// Generate Character OTP
const UniqueCharOTP = (length = 6) => {
    let otp = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        otp += characters[index];
    }
    return otp;
};
exports.UniqueCharOTP = UniqueCharOTP;
// Generate Color HEX Code
const HEXColor = (isWithoutSymbole = false) => {
    return isWithoutSymbole
        ? Math.floor(Math.random() * 16777215).toString(16)
        : "#" + Math.floor(Math.random() * 16777215).toString(16);
};
exports.HEXColor = HEXColor;
// module.exports = {
//   UniqueString,
//   UniqueNumber,
//   UniqueStringId,
//   UniqueNumberId,
//   UniqueOTP,
//   UniqueCharOTP,
//   HEXColor,
//   uuid,
// };

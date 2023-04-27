// const { Base64 } = require("js-base64");
import { Base64 } from "js-base64";

import uuid from "uuid";
// const uuid = require("uuid");

// Random Number Generator

export const RandomNumber = () => Math.floor(Math.random() * 1000) + 1;

// Basically This is Return Encoding in Base64 of RandomNumber(1-1000)+"_"+CurrentTimeInMilliSecond +"_"+RandomNumber(1-1000)

export const UniqueString = () =>
  Base64.encode(`${RandomNumber()}_${Date.now()}_${RandomNumber()}`);

// Basically This is Return RandomNumber(1-1000)+CurrentTimeInMilliSecond+RandomNumber(1-1000)

export const UniqueNumber = () =>
  `${RandomNumber()}${Date.now()}${RandomNumber()}`;

// Basically This is Return Encoding in Base64 of RandomNumber(1-1000)+"-"+Encoding in Base64 of CurrentTimeInMilliSecond +"-"+Encoding in Base64 of RandomNumber(1-1000)

export const UniqueStringId = () =>
  Base64.encode(`${RandomNumber()}`) +
  "-" +
  Base64.encode(`${Date.now()}`) +
  "-" +
  Base64.encode(`${RandomNumber()}`);

// Basically This is Return RandomNumber(1-1000)+"-"+CurrentTimeInMilliSecond +"-"+RandomNumber(1-1000)

export const UniqueNumberId = () =>
  `${RandomNumber()}-${Date.now()}-${RandomNumber()}`;

// Generate Number OTP

export const UniqueOTP = (length = 6) =>
  Math.floor(
    Math.random() * (Math.pow(10, length) - 1 - Math.pow(10, length - 1) + 1)
  ) + Math.pow(10, length - 1);

// Generate Character OTP

export const UniqueCharOTP = (length = 6) => {
  let otp = "";

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);

    otp += characters[index];
  }

  return otp;
};

// Generate Color HEX Code

export const HEXColor = (isWithoutSymbole = false) => {
  return isWithoutSymbole
    ? Math.floor(Math.random() * 16777215).toString(16)
    : "#" + Math.floor(Math.random() * 16777215).toString(16);
};

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

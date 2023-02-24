"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const dategenerate = () => {
    return `${(0, moment_timezone_1.default)().tz("America/La_Paz").format("YYYY-MM-DD HH:mm:ss.SSS")}`;
};
exports.default = dategenerate;

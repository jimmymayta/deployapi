"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const chance_1 = __importDefault(require("chance"));
const codegenerate = () => {
    const chance = new chance_1.default();
    return `${(0, moment_timezone_1.default)()
        .tz("America/La_Paz")
        .format("YYYYMMDDHHmmssSSS")}${chance.string({
        length: 13,
        pool: "123456789",
    })}`;
};
exports.default = codegenerate;

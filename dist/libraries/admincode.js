"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const admincode = (code) => {
    const code1 = (0, moment_timezone_1.default)().subtract(3, "minutes").tz("America/La_Paz").format("YYYYMMDDHHmmss");
    const code2 = (0, moment_timezone_1.default)().add(3, "minutes").tz("America/La_Paz").format("YYYYMMDDHHmmss");
    return +code1 < +code && +code < +code2 ? true : false;
};
exports.default = admincode;
//# sourceMappingURL=admincode.js.map
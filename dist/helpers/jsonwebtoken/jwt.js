"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTverify = exports.JWTsign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../../environments/env"));
const JWTsign = (code) => {
    return jsonwebtoken_1.default.sign({ code }, env_1.default.keysecret, {
        expiresIn: "24h",
    });
};
exports.JWTsign = JWTsign;
const JWTverify = (token) => {
    return jsonwebtoken_1.default.verify(token, env_1.default.keysecret);
};
exports.JWTverify = JWTverify;

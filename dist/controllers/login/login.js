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
exports.login = void 0;
const member_1 = __importDefault(require("../../models/member"));
const jwt_1 = require("../../helpers/jsonwebtoken/jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const member = yield member_1.default.findOne({
        identitycard: password,
        state: "activated",
    });
    if (member === null) {
        return res.json({
            message: 'Contraseña incorrecta o usuario desactivado',
        });
    }
    const jwt = member !== null ? (0, jwt_1.JWTsign)(member.membercode) : null;
    return res.json({
        token: jwt,
    });
});
exports.login = login;

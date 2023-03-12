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
exports.loginverify = exports.login = void 0;
const member_1 = __importDefault(require("../../models/member"));
const jwt_1 = require("../../helpers/jsonwebtoken/jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const member = yield member_1.default.findOne({
        identitycard: password,
        state: "activated",
    }).select({
        _id: 0,
        membercode: 1,
        names: 1,
        firstlastname: 1,
        secondlastname: 1,
    });
    if (member === null) {
        return res.json({
            message: "Contraseña incorrecta o usuario desactivado",
        });
    }
    const jwt = member !== null ? (0, jwt_1.JWTsign)(member.membercode) : null;
    return res.json({
        token: jwt,
        member,
    });
});
exports.login = login;
const loginverify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const data = (0, jwt_1.JWTverify)(token);
        if (!data) {
            return res.json({ token: null });
        }
        console.log(data.code);
    }
    catch (error) {
        return res.json({ token: null });
    }
    return res.json({ token: token });
});
exports.loginverify = loginverify;

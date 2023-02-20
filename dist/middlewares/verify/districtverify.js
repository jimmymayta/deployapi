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
exports.districtcodeverify = exports.districtnameverify = void 0;
const district_1 = __importDefault(require("../../models/district"));
const districtnameverify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { districtname } = req.body;
    const districtresult = yield district_1.default.findOne({ districtname });
    if (districtresult !== null) {
        return res.json({ error: "ya existe" });
    }
    next();
});
exports.districtnameverify = districtnameverify;
const districtcodeverify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { districtname } = req.body;
    const districtresult = yield district_1.default.findOne({ districtcode: code });
    if (districtresult === null) {
        return res.json({ error: "no existe code" });
    }
    next();
});
exports.districtcodeverify = districtcodeverify;
//# sourceMappingURL=districtverify.js.map
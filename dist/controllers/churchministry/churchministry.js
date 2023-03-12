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
exports.churchministrydelete = exports.churchministryupdate = exports.churchministrycreate = exports.churchministry = void 0;
const church_1 = __importDefault(require("../../models/church"));
const churchministry_1 = __importDefault(require("../../models/churchministry"));
const member_1 = __importDefault(require("../../models/member"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const datainfomemberaccess_1 = require("../../helpers/datainfomemberaccess/datainfomemberaccess");
const churchministry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const churchministryresult = yield churchministry_1.default.find({
        state: "activated",
    });
    return res.json({
        churchministry: churchministryresult,
        datainfo: yield (0, datainfomemberaccess_1.datainfomemberaccess)(req.code || "", "churchministry")
    });
});
exports.churchministry = churchministry;
const churchministrycreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { churchministryname, idchurch } = req.body;
    const churchministrymodel = new churchministry_1.default({
        churchministrycode: (0, codegenerate_1.default)(),
        churchministryname: churchministryname ? churchministryname : null,
        idchurch: idchurch
            ? yield (0, idcode_1.default)(church_1.default, { churchcode: idchurch })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const churchministryresult = yield churchministrymodel.save();
    return res.json({
        churchministry: churchministryresult,
    });
});
exports.churchministrycreate = churchministrycreate;
const churchministryupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { churchministryname, idchurch } = req.body;
    yield churchministry_1.default.findOneAndUpdate({
        churchministrycode: code,
    }, {
        churchministryname: churchministryname ? churchministryname : null,
        idchurch: idchurch
            ? yield (0, idcode_1.default)(church_1.default, { churchcode: idchurch })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        churchministry: yield churchministry_1.default.findOne({
            churchministrycode: code,
        }),
    });
});
exports.churchministryupdate = churchministryupdate;
const churchministrydelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const name = yield churchministry_1.default.findOne({
        churchministrycode: code,
    });
    yield churchministry_1.default.findOneAndUpdate({
        churchministrycode: code,
    }, {
        churchministryname: `${name === null || name === void 0 ? void 0 : name.churchministryname} (Eliminado) ${(0, codegenerate_1.default)()}`,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        churchministry: yield churchministry_1.default.findOne({ churchministrycode: code }),
    });
});
exports.churchministrydelete = churchministrydelete;

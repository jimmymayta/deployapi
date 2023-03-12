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
exports.churchchargedelete = exports.churchchargeupdate = exports.churchchargecreate = exports.churchcharge = void 0;
const churchcharge_1 = __importDefault(require("../../models/churchcharge"));
const churchministry_1 = __importDefault(require("../../models/churchministry"));
const member_1 = __importDefault(require("../../models/member"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const datainfomemberaccess_1 = require("../../helpers/datainfomemberaccess/datainfomemberaccess");
const churchcharge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        churchcharge: yield churchcharge_1.default.find({
            state: "activated",
        }),
        datainfo: yield (0, datainfomemberaccess_1.datainfomemberaccess)(req.code || "", "churchcharge")
    });
});
exports.churchcharge = churchcharge;
const churchchargecreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { churchchargename, idmember, idchurchministry } = req.body;
    const churchchargemodel = new churchcharge_1.default({
        churchchargecode: (0, codegenerate_1.default)(),
        churchchargename: churchchargename ? churchchargename : null,
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        idchurchministry: idchurchministry
            ? yield (0, idcode_1.default)(churchministry_1.default, {
                churchministrycode: idchurchministry,
            })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const churchchargeresult = yield churchchargemodel.save();
    return res.json({
        churchcharge: churchchargeresult,
    });
});
exports.churchchargecreate = churchchargecreate;
const churchchargeupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { churchchargename, idmember, idchurchministry } = req.body;
    yield churchcharge_1.default.findOneAndUpdate({
        churchchargecode: code,
    }, {
        churchchargename: churchchargename ? churchchargename : null,
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        idchurchministry: idchurchministry
            ? yield (0, idcode_1.default)(churchministry_1.default, {
                churchministrycode: idchurchministry,
            })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        churchcharge: yield churchcharge_1.default.findOne({ churchchargecode: code }),
    });
});
exports.churchchargeupdate = churchchargeupdate;
const churchchargedelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const nombre = yield churchcharge_1.default.findOne({ churchchargecode: code });
    yield churchcharge_1.default.findOneAndUpdate({
        churchchargecode: code,
    }, {
        churchchargename: `${nombre === null || nombre === void 0 ? void 0 : nombre.churchchargename} (eliminado) ${(0, codegenerate_1.default)()}`,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        churchcharge: yield churchcharge_1.default.findOne({ churchchargecode: code }),
    });
});
exports.churchchargedelete = churchchargedelete;

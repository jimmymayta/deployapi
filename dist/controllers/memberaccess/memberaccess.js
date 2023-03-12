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
exports.memberaccessdelete = exports.memberaccessupdate = exports.memberaccess = void 0;
const member_1 = __importDefault(require("../../models/member"));
const memberaccess_1 = __importDefault(require("../../models/memberaccess"));
const dataamemberccess_1 = require("../../data/dataamemberccess");
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const datainfomemberaccess_1 = require("../../helpers/datainfomemberaccess/datainfomemberaccess");
const memberaccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const memberaccessresult = yield memberaccess_1.default.find({
        idmember: yield (0, idcode_1.default)(member_1.default, { membercode: code }),
        state: "activated",
    });
    return res.json({
        memberaccess: memberaccessresult,
        datainfo: yield (0, datainfomemberaccess_1.datainfomemberaccess)(req.code || "", "memberaccess")
    });
});
exports.memberaccess = memberaccess;
const memberaccessupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { memberaccesscreate, memberaccessupdate, memberaccessdelete, memberaccesslevelname, } = req.body;
    const { number, level, data } = dataamemberccess_1.accesslevel.find((e) => e.level === memberaccesslevelname) || { number: 1, level: "personal", data: "Nivel Personal" };
    yield memberaccess_1.default.findOneAndUpdate({ memberaccesscode: code }, {
        memberaccesscreate: memberaccesscreate === "true" ? true : false,
        memberaccessupdate: memberaccessupdate === "true" ? true : false,
        memberaccessdelete: memberaccessdelete === "true" ? true : false,
        memberaccesslevelnumber: number,
        memberaccesslevelname: level,
        memberaccessleveldata: data,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberaccess: yield memberaccess_1.default.findOne({ memberaccesscode: code }),
    });
});
exports.memberaccessupdate = memberaccessupdate;
const memberaccessdelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    yield memberaccess_1.default.findOneAndUpdate({ memberaccesscode: code }, {
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: 'deleted',
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberaccess: yield memberaccess_1.default.findOne({ memberaccesscode: code }),
    });
});
exports.memberaccessdelete = memberaccessdelete;

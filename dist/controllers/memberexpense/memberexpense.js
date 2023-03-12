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
exports.memberexpensedelete = exports.memberexpenseupdate = exports.memberexpensecreate = exports.memberexpense = void 0;
const member_1 = __importDefault(require("../../models/member"));
const memberexpense_1 = __importDefault(require("../../models/memberexpense"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const expense_1 = __importDefault(require("../../models/expense"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const datainfomemberaccess_1 = require("../../helpers/datainfomemberaccess/datainfomemberaccess");
const memberexpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        memberexpense: yield memberexpense_1.default.find({ state: "activated" }),
        datainfo: yield (0, datainfomemberaccess_1.datainfomemberaccess)(req.code || "", "memberexpense")
    });
});
exports.memberexpense = memberexpense;
const memberexpensecreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idmember, idexpense } = req.body;
    const memberexpense = new memberexpense_1.default({
        memberexpensecode: (0, codegenerate_1.default)(),
        idmember: idmember ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember }) : null,
        idexpense: idexpense ? yield (0, idcode_1.default)(expense_1.default, { expensecode: idexpense }) : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const memberexpenseresult = yield memberexpense.save();
    return res.json({
        memberexpense: memberexpenseresult,
    });
});
exports.memberexpensecreate = memberexpensecreate;
const memberexpenseupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { idmember, idexpense } = req.body;
    yield memberexpense_1.default.findOneAndUpdate({
        memberexpensecode: code,
    }, {
        idmember: idmember ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember }) : null,
        idexpense: idexpense ? yield (0, idcode_1.default)(expense_1.default, { expensecode: idexpense }) : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberexpense: yield memberexpense_1.default.findOne({ memberexpensecode: code }),
    });
});
exports.memberexpenseupdate = memberexpenseupdate;
const memberexpensedelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    yield memberexpense_1.default.findOneAndUpdate({
        memberexpensecode: code,
    }, {
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberexpense: yield memberexpense_1.default.findOne({ memberexpensecode: code }),
    });
});
exports.memberexpensedelete = memberexpensedelete;

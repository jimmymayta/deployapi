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
exports.memberexpensedatadelete = exports.memberexpensedataupdate = exports.memberexpensedatacreate = exports.memberexpensedata = void 0;
const mathjs_1 = require("mathjs");
const member_1 = __importDefault(require("../../models/member"));
const memberexpensedata_1 = __importDefault(require("../../models/memberexpensedata"));
const memberexpense_1 = __importDefault(require("../../models/memberexpense"));
const expense_1 = __importDefault(require("../../models/expense"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const memberexpensedata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        memberexpensedata: yield memberexpensedata_1.default.find({
            state: "activated",
        }),
    });
});
exports.memberexpensedata = memberexpensedata;
const memberexpensedatacreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idmember, idexpense, idmemberexpense, amount } = req.body;
    const memberexpensedata = new memberexpensedata_1.default({
        memberexpensedatacode: (0, codegenerate_1.default)(),
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        idexpense: idexpense
            ? yield (0, idcode_1.default)(expense_1.default, { expensecode: idexpense })
            : null,
        idmemberexpense: idmemberexpense
            ? yield (0, idcode_1.default)(memberexpense_1.default, { memberexpensecode: idmemberexpense })
            : null,
        amount: amount ? (0, mathjs_1.round)(+amount, 2).toFixed(2) : (0, mathjs_1.round)(0, 2).toFixed(2),
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const memberexpensedataresult = yield memberexpensedata.save();
    return res.json({
        memberexpensedata: memberexpensedataresult,
    });
});
exports.memberexpensedatacreate = memberexpensedatacreate;
const memberexpensedataupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { idmember, idexpense, idmemberexpense, amount } = req.body;
    yield memberexpensedata_1.default.findOneAndUpdate({
        memberexpensedatacode: code,
    }, {
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        idexpense: idexpense
            ? yield (0, idcode_1.default)(expense_1.default, { expensecode: idexpense })
            : null,
        idmemberexpense: idmemberexpense
            ? yield (0, idcode_1.default)(memberexpense_1.default, {
                memberexpensecode: idmemberexpense,
            })
            : null,
        amount: amount ? (0, mathjs_1.round)(+amount, 2).toFixed(2) : (0, mathjs_1.round)(0, 2).toFixed(2),
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberexpensedata: yield memberexpensedata_1.default.findOne({
            memberexpensedatacode: code,
        }),
    });
});
exports.memberexpensedataupdate = memberexpensedataupdate;
const memberexpensedatadelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    yield memberexpensedata_1.default.findOneAndUpdate({
        memberexpensedatacode: code,
    }, {
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberexpensedata: yield memberexpensedata_1.default.findOne({
            memberexpensedatacode: code,
        }),
    });
});
exports.memberexpensedatadelete = memberexpensedatadelete;

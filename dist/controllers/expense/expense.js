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
exports.expensedelete = exports.expenseupdate = exports.expensecreate = exports.expense = void 0;
const member_1 = __importDefault(require("../../models/member"));
const expense_1 = __importDefault(require("../../models/expense"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const datainfomemberaccess_1 = require("../../helpers/datainfomemberaccess/datainfomemberaccess");
const expense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        expense: yield expense_1.default.find({ state: "activated" }),
        datainfo: yield (0, datainfomemberaccess_1.datainfomemberaccess)(req.code || "", "expense")
    });
});
exports.expense = expense;
const expensecreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { expensename } = req.body;
    const expensemodel = new expense_1.default({
        expensecode: (0, codegenerate_1.default)(),
        expensename: expensename ? expensename : (0, codegenerate_1.default)(),
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const expenseresult = yield expensemodel.save();
    return res.json({
        expense: expenseresult,
    });
});
exports.expensecreate = expensecreate;
const expenseupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { expensename } = req.body;
    yield expense_1.default.findOneAndUpdate({
        expensecode: code,
    }, {
        expensename: expensename ? expensename : (0, codegenerate_1.default)(),
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        expense: yield expense_1.default.findOne({ expensecode: code }),
    });
});
exports.expenseupdate = expenseupdate;
const expensedelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const nombre = yield expense_1.default.findOne({ expensecode: code });
    if (nombre) {
        yield expense_1.default.findOneAndUpdate({
            expensecode: code,
        }, {
            expensename: `${nombre.expensename} (eliminado) ${(0, codegenerate_1.default)()}`,
            membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
            state: "deleted",
            datedelete: (0, dategenerate_1.default)(),
        });
    }
    return res.json({
        expense: yield expense_1.default.findOne({ expensecode: code }),
    });
});
exports.expensedelete = expensedelete;

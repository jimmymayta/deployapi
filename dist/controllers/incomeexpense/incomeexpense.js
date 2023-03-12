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
exports.incomeexpensedelete = exports.incomeexpenseupdate = exports.incomeexpensecreate = exports.incomeexpense = void 0;
const member_1 = __importDefault(require("../../models/member"));
const income_1 = __importDefault(require("../../models/income"));
const expense_1 = __importDefault(require("../../models/expense"));
const incomeexpense_1 = __importDefault(require("../../models/incomeexpense"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const datainfomemberaccess_1 = require("../../helpers/datainfomemberaccess/datainfomemberaccess");
const incomeexpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        incomeexpense: yield incomeexpense_1.default.find({ state: "activated" }),
        datainfo: yield (0, datainfomemberaccess_1.datainfomemberaccess)(req.code || "", "incomeexpense")
    });
});
exports.incomeexpense = incomeexpense;
const incomeexpensecreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idincome, idexpense } = req.body;
    const incomeexpense = new incomeexpense_1.default({
        incomeexpensecode: (0, codegenerate_1.default)(),
        idincome: idincome ? yield (0, idcode_1.default)(income_1.default, { incomecode: idincome }) : null,
        idexpense: idexpense ? yield (0, idcode_1.default)(expense_1.default, { expensecode: idexpense }) : null,
        incomeexpenseamount: 0,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const incomeexpenseresult = yield incomeexpense.save();
    return res.json({
        incomeexpense: incomeexpenseresult,
    });
});
exports.incomeexpensecreate = incomeexpensecreate;
const incomeexpenseupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { idincome, idexpense } = req.body;
    yield incomeexpense_1.default.findOneAndUpdate({
        incomeexpensecode: code,
    }, {
        idincome: idincome
            ? yield (0, idcode_1.default)(income_1.default, { incomecode: idincome })
            : null,
        idexpense: idexpense
            ? yield (0, idcode_1.default)(expense_1.default, { expensecode: idexpense })
            : null,
        incomeexpenseamount: 0,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    const incomeexpenseresult = yield incomeexpense_1.default.findOne({
        incomeexpensecode: code,
    });
    return res.json({
        incomeexpense: incomeexpenseresult,
    });
});
exports.incomeexpenseupdate = incomeexpenseupdate;
const incomeexpensedelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    yield incomeexpense_1.default.findOneAndUpdate({
        incomeexpensecode: code,
    }, {
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    const incomeexpenseresult = yield incomeexpense_1.default.findOne({
        incomeexpensecode: code,
    });
    return res.json({
        incomeexpense: incomeexpenseresult,
    });
});
exports.incomeexpensedelete = incomeexpensedelete;

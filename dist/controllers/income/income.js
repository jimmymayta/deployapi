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
exports.incomedelete = exports.incomeupdate = exports.incomecreate = exports.income = void 0;
const member_1 = __importDefault(require("../../models/member"));
const income_1 = __importDefault(require("../../models/income"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const datainfomemberaccess_1 = require("../../helpers/datainfomemberaccess/datainfomemberaccess");
const income = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        income: yield income_1.default.find({ state: "activated" }),
        datainfo: yield (0, datainfomemberaccess_1.datainfomemberaccess)(req.code || "", "income")
    });
});
exports.income = income;
const incomecreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { incomename } = req.body;
    const income = new income_1.default({
        incomecode: (0, codegenerate_1.default)(),
        incomename: incomename ? incomename : (0, codegenerate_1.default)(),
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const incomeresult = yield income.save();
    return res.json({
        income: incomeresult,
    });
});
exports.incomecreate = incomecreate;
const incomeupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { incomename } = req.body;
    yield income_1.default.findOneAndUpdate({
        incomecode: code,
    }, {
        incomename: incomename ? incomename : (0, codegenerate_1.default)(),
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        income: yield income_1.default.findOne({ incomecode: code }),
    });
});
exports.incomeupdate = incomeupdate;
const incomedelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const nombre = yield income_1.default.findOne({ incomecode: code });
    if (nombre) {
        yield income_1.default.findOneAndUpdate({
            incomecode: code,
        }, {
            incomename: `${nombre.incomename} (eliminado) ${(0, codegenerate_1.default)()}`,
            membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
            state: "deleted",
            datedelete: (0, dategenerate_1.default)(),
        });
    }
    return res.json({
        income: yield income_1.default.findOne({ incomecode: code }),
    });
});
exports.incomedelete = incomedelete;

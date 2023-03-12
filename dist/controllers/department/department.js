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
exports.departmentdelete = exports.departmentupdate = exports.departmentcreate = exports.department = void 0;
const department_1 = __importDefault(require("../../models/department"));
const member_1 = __importDefault(require("../../models/member"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const datainfomemberaccess_1 = require("../../helpers/datainfomemberaccess/datainfomemberaccess");
const departmentname = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield department_1.default.findOne({
        departmentcode: code,
    });
    return department === null || department === void 0 ? void 0 : department.departmentname;
});
const department = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentresult = yield department_1.default.find({ state: "activated" })
        .select("_id departmentcode departmentname departmentabbreviation")
        .sort({
        departmentname: "asc",
    });
    return res.json({
        department: departmentresult,
        datainfo: yield (0, datainfomemberaccess_1.datainfomemberaccess)(req.code || "", "department"),
    });
});
exports.department = department;
const departmentcreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { departmentname, departmentabbreviation } = req.body;
    const department = new department_1.default({
        departmentcode: (0, codegenerate_1.default)(),
        departmentname: departmentname,
        departmentabbreviation: departmentabbreviation,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const departmentresult = yield department.save();
    return res.json({
        department: departmentresult,
    });
});
exports.departmentcreate = departmentcreate;
const departmentupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { departmentname, departmentabbreviation } = req.body;
    yield department_1.default.findOneAndUpdate({ departmentcode: code }, {
        departmentname: departmentname ? departmentname : null,
        departmentabbreviation: departmentabbreviation
            ? departmentabbreviation
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        department: yield department_1.default.findOne({ departmentcode: code }),
    });
});
exports.departmentupdate = departmentupdate;
const departmentdelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    yield department_1.default.findOneAndUpdate({ departmentcode: code }, {
        departmentname: `${yield departmentname(code)} (eliminado) - ${(0, codegenerate_1.default)()}`,
        state: "deleted",
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        department: yield department_1.default.findOne({ departmentcode: code }),
    });
});
exports.departmentdelete = departmentdelete;

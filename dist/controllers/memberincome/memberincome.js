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
exports.memberincomedelete = exports.memberincomeupdate = exports.memberincomecreate = exports.memberincome = void 0;
const member_1 = __importDefault(require("../../models/member"));
const income_1 = __importDefault(require("../../models/income"));
const memberincome_1 = __importDefault(require("../../models/memberincome"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const memberincome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        memberincome: yield memberincome_1.default.find({ state: "activated" }),
    });
});
exports.memberincome = memberincome;
const memberincomecreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idmember, idincome } = req.body;
    const memberincome = new memberincome_1.default({
        memberincomecode: (0, codegenerate_1.default)(),
        idmember: idmember ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember }) : null,
        idincome: idincome ? yield (0, idcode_1.default)(income_1.default, { incomecode: idincome }) : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const memberincomeresult = yield memberincome.save();
    return res.json({
        memberincome: memberincomeresult,
    });
});
exports.memberincomecreate = memberincomecreate;
const memberincomeupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { idmember, idincome } = req.body;
    yield memberincome_1.default.findOneAndUpdate({
        memberincomecode: code,
    }, {
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        idincome: idincome
            ? yield (0, idcode_1.default)(income_1.default, { incomecode: idincome })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberincome: yield memberincome_1.default.findOne({ memberincomecode: code }),
    });
});
exports.memberincomeupdate = memberincomeupdate;
const memberincomedelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    yield memberincome_1.default.findOneAndUpdate({
        memberincomecode: code,
    }, {
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberincome: yield memberincome_1.default.findOne({ memberincomecode: code }),
    });
});
exports.memberincomedelete = memberincomedelete;

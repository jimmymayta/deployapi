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
exports.memberincomedatadelete = exports.memberincomedataupdate = exports.memberincomedatacreate = exports.memberincomedata = void 0;
const mathjs_1 = require("mathjs");
const member_1 = __importDefault(require("../../models/member"));
const income_1 = __importDefault(require("../../models/income"));
const memberincome_1 = __importDefault(require("../../models/memberincome"));
const memberincomedata_1 = __importDefault(require("../../models/memberincomedata"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const memberincomedata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        memberincomedata: yield memberincomedata_1.default.find({ state: "activated" }),
    });
});
exports.memberincomedata = memberincomedata;
const memberincomedatacreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idmember, idincome, idmemberincome, amount } = req.body;
    const memberincomedata = new memberincomedata_1.default({
        memberincomedatacode: (0, codegenerate_1.default)(),
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        idincome: idincome
            ? yield (0, idcode_1.default)(income_1.default, { incomecode: idincome })
            : null,
        idmemberincome: idmemberincome
            ? yield (0, idcode_1.default)(memberincome_1.default, { memberincomecode: idmemberincome })
            : null,
        amount: amount ? (0, mathjs_1.round)(+amount, 2).toFixed(2) : (0, mathjs_1.round)(0, 2).toFixed(2),
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const memberincomedataresult = yield memberincomedata.save();
    return res.json({
        memberincomedata: memberincomedataresult,
    });
});
exports.memberincomedatacreate = memberincomedatacreate;
const memberincomedataupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { idmember, idincome, idmemberincome, amount } = req.body;
    yield memberincomedata_1.default.findOneAndUpdate({
        memberincomedatacode: code,
    }, {
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        idincome: idincome
            ? yield (0, idcode_1.default)(income_1.default, { incomecode: idincome })
            : null,
        idmemberincome: idmemberincome
            ? yield (0, idcode_1.default)(memberincome_1.default, { memberincomecode: idmemberincome })
            : null,
        amount: amount ? (0, mathjs_1.round)(+amount, 2).toFixed(2) : (0, mathjs_1.round)(0, 2).toFixed(2),
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberincomedata: yield memberincomedata_1.default.findOne({
            memberincomedatacode: code,
        }),
    });
});
exports.memberincomedataupdate = memberincomedataupdate;
const memberincomedatadelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    yield memberincomedata_1.default.findOneAndUpdate({
        memberincomedatacode: code,
    }, {
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberincomedata: yield memberincomedata_1.default.findOne({
            memberincomedatacode: code,
        }),
    });
});
exports.memberincomedatadelete = memberincomedatadelete;

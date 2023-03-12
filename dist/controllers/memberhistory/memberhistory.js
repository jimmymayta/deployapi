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
exports.memberhistorydelete = exports.memberhistoryupdate = exports.memberhistorycreate = exports.memberhistory = void 0;
const memberhistory_1 = __importDefault(require("../../models/memberhistory"));
const member_1 = __importDefault(require("../../models/member"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const datainfomemberaccess_1 = require("../../helpers/datainfomemberaccess/datainfomemberaccess");
const memberhistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberhistory = yield memberhistory_1.default.find({
        state: "activated",
    });
    return res.json({
        memberhistory,
        datainfo: yield (0, datainfomemberaccess_1.datainfomemberaccess)(req.code || "", "memberhistory")
    });
});
exports.memberhistory = memberhistory;
const memberhistorycreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberhistorytitle, memberhistorydescription, memberhistorydate, idmember, } = req.body;
    const memberhistorymodel = new memberhistory_1.default({
        memberhistorycode: (0, codegenerate_1.default)(),
        memberhistorytitle: memberhistorytitle ? memberhistorytitle : null,
        memberhistorydescription: memberhistorydescription
            ? memberhistorydescription
            : null,
        memberhistorydate: memberhistorydate ? memberhistorydate : null,
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const memberhistoryresult = yield memberhistorymodel.save();
    return res.json({
        memberhistory: memberhistoryresult,
    });
});
exports.memberhistorycreate = memberhistorycreate;
const memberhistoryupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { memberhistorytitle, memberhistorydescription, memberhistorydate, idmember, } = req.body;
    yield memberhistory_1.default.findOneAndUpdate({
        memberhistorycode: code,
    }, {
        memberhistorytitle: memberhistorytitle ? memberhistorytitle : null,
        memberhistorydescription: memberhistorydescription
            ? memberhistorydescription
            : null,
        memberhistorydate: memberhistorydate ? memberhistorydate : null,
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberhistory: yield memberhistory_1.default.findOne({
            memberhistorycode: code,
        }),
    });
});
exports.memberhistoryupdate = memberhistoryupdate;
const memberhistorydelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    yield memberhistory_1.default.findOneAndUpdate({
        memberhistorycode: code,
    }, {
        state: "deleted",
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberhistory: yield memberhistory_1.default.findOne({
            memberhistorycode: code,
        }),
    });
});
exports.memberhistorydelete = memberhistorydelete;

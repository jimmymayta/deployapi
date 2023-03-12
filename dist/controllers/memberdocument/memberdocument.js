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
exports.memberdocumentdelete = exports.memberdocumentupdate = exports.memberdocumentcreate = exports.memberdocument = void 0;
const member_1 = __importDefault(require("../../models/member"));
const memberdocument_1 = __importDefault(require("../../models/memberdocument"));
const memberdocument_2 = require("../../helpers/filedocument/memberdocument");
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const datainfomemberaccess_1 = require("../../helpers/datainfomemberaccess/datainfomemberaccess");
const memberdocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberdocumentresult = yield memberdocument_1.default.find({
        state: "activated",
    });
    return res.json({
        memberdocument: memberdocumentresult,
        datainfo: yield (0, datainfomemberaccess_1.datainfomemberaccess)(req.code || "", "memberdocument")
    });
});
exports.memberdocument = memberdocument;
const memberdocumentcreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberdocumenttitle, memberdocumentdescription, idmember } = req.body;
    const { file } = req.files || { file: null };
    const { documentname, documentfile, documentextension } = yield (0, memberdocument_2.memberdocumentuploadfile)(file, "document/memberdocument");
    const memberdocument = new memberdocument_1.default({
        memberdocumentcode: (0, codegenerate_1.default)(),
        memberdocumenttitle: memberdocumenttitle ? memberdocumenttitle : null,
        memberdocumentdescription: memberdocumentdescription
            ? memberdocumentdescription
            : null,
        memberdocumentnumber: null,
        memberdocumentname: documentname ? documentname : null,
        memberdocumentfile: documentfile ? documentfile : null,
        memberdocumentextension: documentextension ? documentextension : null,
        memberdocumentdate: (0, dategenerate_1.default)(),
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const memberdocumentresult = yield memberdocument.save();
    return res.json({
        memberdocument: memberdocumentresult,
    });
});
exports.memberdocumentcreate = memberdocumentcreate;
const memberdocumentupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { memberdocumenttitle, memberdocumentdescription, idmember } = req.body;
    const { file } = req.files || { file: null };
    const docfile = yield memberdocument_1.default.findOne({
        memberdocumentcode: code,
    });
    if (docfile) {
        (0, memberdocument_2.memberdocumentdeletefile)(docfile.memberdocumentfile, "document/memberdocument");
    }
    const { documentname, documentfile, documentextension } = yield (0, memberdocument_2.memberdocumentuploadfile)(file, "document/memberdocument");
    yield memberdocument_1.default.findOneAndUpdate({
        memberdocumentcode: code,
    }, {
        memberdocumenttitle: memberdocumenttitle ? memberdocumenttitle : null,
        memberdocumentdescription: memberdocumentdescription
            ? memberdocumentdescription
            : null,
        memberdocumentnumber: null,
        memberdocumentname: documentname ? documentname : null,
        memberdocumentfile: documentfile ? documentfile : null,
        memberdocumentextension: documentextension ? documentextension : null,
        memberdocumentdate: (0, dategenerate_1.default)(),
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberdocument: yield memberdocument_1.default.findOne({
            memberdocumentcode: code,
        }),
    });
});
exports.memberdocumentupdate = memberdocumentupdate;
const memberdocumentdelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const docfile = yield memberdocument_1.default.findOne({
        memberdocumentcode: code,
    });
    if (docfile) {
        (0, memberdocument_2.memberdocumentdeletefile)(docfile.memberdocumentfile, "document/memberdocument");
    }
    yield memberdocument_1.default.findOneAndUpdate({
        memberdocumentcode: code,
    }, {
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        memberdocument: yield memberdocument_1.default.findOne({
            memberdocumentcode: code,
        }),
    });
});
exports.memberdocumentdelete = memberdocumentdelete;

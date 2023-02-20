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
exports.membermapdelete = exports.membermapupdate = exports.membermapcreate = exports.membermap = void 0;
const member_1 = __importDefault(require("../../models/member"));
const membermap_1 = __importDefault(require("../../models/membermap"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const membermap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        membermap: yield membermap_1.default.find({ state: "activated" }),
    });
});
exports.membermap = membermap;
const membermapcreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { membermaplatitude, membermaplongitude, membermapzoom, membermapmarkerlatitude, membermapmarkerlongitude, idmember, } = req.body;
    const membermapmodel = new membermap_1.default({
        membermapcode: (0, codegenerate_1.default)(),
        membermaplatitude: membermaplatitude ? membermaplatitude : null,
        membermaplongitude: membermaplongitude ? membermaplongitude : null,
        membermapzoom: membermapzoom ? membermapzoom : null,
        membermapmarkerlatitude: membermapmarkerlatitude
            ? membermapmarkerlatitude
            : null,
        membermapmarkerlongitude: membermapmarkerlongitude
            ? membermapmarkerlongitude
            : null,
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const membermapresult = yield membermapmodel.save();
    return res.json({
        membermap: membermapresult,
    });
});
exports.membermapcreate = membermapcreate;
const membermapupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { membermaplatitude, membermaplongitude, membermapzoom, membermapmarkerlatitude, membermapmarkerlongitude, idmember, } = req.body;
    yield membermap_1.default.findOneAndUpdate({
        membermapcode: code,
    }, {
        membermapcode: (0, codegenerate_1.default)(),
        membermaplatitude: membermaplatitude ? membermaplatitude : null,
        membermaplongitude: membermaplongitude ? membermaplongitude : null,
        membermapzoom: membermapzoom ? membermapzoom : null,
        membermapmarkerlatitude: membermapmarkerlatitude
            ? membermapmarkerlatitude
            : null,
        membermapmarkerlongitude: membermapmarkerlongitude
            ? membermapmarkerlongitude
            : null,
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const membermapresult = yield membermap_1.default.findOneAndUpdate({
        membermapcode: code,
    });
    return res.json({
        membermap: membermapresult,
    });
});
exports.membermapupdate = membermapupdate;
const membermapdelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    yield membermap_1.default.findOneAndUpdate({
        membermapcode: code,
    }, {
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        membermap: yield membermap_1.default.findOne({ membermapcode: code }),
    });
});
exports.membermapdelete = membermapdelete;
//# sourceMappingURL=membermap.js.map
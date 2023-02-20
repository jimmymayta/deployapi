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
exports.churchmapdelete = exports.churchmapupdate = exports.churchmapcreate = exports.churchmap = void 0;
const church_1 = __importDefault(require("../../models/church"));
const churchmap_1 = __importDefault(require("../../models/churchmap"));
const member_1 = __importDefault(require("../../models/member"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const churchmap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const churchmapresult = yield churchmap_1.default.find({ state: "activated" });
    return res.json({
        churchmap: churchmapresult,
    });
});
exports.churchmap = churchmap;
const churchmapcreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { churchmaplatitude, churchmaplongitude, churchmapzoom, churchmapmarkerlatitude, churchmapmarkerlongitude, idchurch, } = req.body;
    const churchmapmodel = new churchmap_1.default({
        churchmapcode: (0, codegenerate_1.default)(),
        churchmaplatitude: churchmaplatitude ? churchmaplatitude : null,
        churchmaplongitude: churchmaplongitude ? churchmaplongitude : null,
        churchmapzoom: churchmapzoom ? churchmapzoom : null,
        churchmapmarkerlatitude: churchmapmarkerlatitude
            ? churchmapmarkerlatitude
            : null,
        churchmapmarkerlongitude: churchmapmarkerlongitude
            ? churchmapmarkerlongitude
            : null,
        idchurch: idchurch
            ? yield (0, idcode_1.default)(church_1.default, { churchcode: idchurch })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const churchmapresult = yield churchmapmodel.save();
    return res.json({
        churchmap: churchmapresult,
    });
});
exports.churchmapcreate = churchmapcreate;
const churchmapupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { churchmaplatitude, churchmaplongitude, churchmapzoom, churchmapmarkerlatitude, churchmapmarkerlongitude, idchurch, } = req.body;
    yield churchmap_1.default.findOneAndUpdate({
        churchmapcode: code,
    }, {
        churchmaplatitude: churchmaplatitude ? churchmaplatitude : null,
        churchmaplongitude: churchmaplongitude ? churchmaplongitude : null,
        churchmapzoom: churchmapzoom ? churchmapzoom : null,
        churchmapmarkerlatitude: churchmapmarkerlatitude ? churchmapmarkerlatitude : null,
        churchmapmarkerlongitude: churchmapmarkerlongitude ? churchmapmarkerlongitude : null,
        idchurch: idchurch ? yield (0, idcode_1.default)(church_1.default, { churchcode: idchurch }) : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        churchmap: yield churchmap_1.default.findOne({ churchmapcode: code }),
    });
});
exports.churchmapupdate = churchmapupdate;
const churchmapdelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    yield churchmap_1.default.findOneAndUpdate({
        churchmapcode: code,
    }, {
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        churchmap: yield churchmap_1.default.findOne({ churchmapcode: code }),
    });
});
exports.churchmapdelete = churchmapdelete;
//# sourceMappingURL=churchmap.js.map
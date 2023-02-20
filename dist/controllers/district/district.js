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
exports.districtdelete = exports.districtupdate = exports.districtcreate = exports.district = void 0;
const member_1 = __importDefault(require("../../models/member"));
const district_1 = __importDefault(require("../../models/district"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const district = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const districtresult = yield district_1.default.find({ state: "activated" });
    return res.json({
        district: districtresult,
    });
});
exports.district = district;
const districtcreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { districtname } = req.body;
    const district = new district_1.default({
        districtcode: (0, codegenerate_1.default)(),
        districtname: districtname,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const districtresult = yield district.save();
    return res.json({
        district: districtresult,
    });
});
exports.districtcreate = districtcreate;
const districtupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { districtname } = req.body;
    yield district_1.default.findOneAndUpdate({ districtcode: code }, {
        districtname: districtname,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        district: yield district_1.default.findOne({ districtcode: code }),
    });
});
exports.districtupdate = districtupdate;
const districtdelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const districtname = yield district_1.default.findOne({ districtcode: code });
    yield district_1.default.findOneAndUpdate({ districtcode: code }, {
        districtname: `${districtname === null || districtname === void 0 ? void 0 : districtname.districtname} (eliminado) - ${(0, codegenerate_1.default)()}`,
        state: "deleted",
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        district: yield district_1.default.findOne({ districtcode: code }),
    });
});
exports.districtdelete = districtdelete;
//# sourceMappingURL=district.js.map
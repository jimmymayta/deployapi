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
exports.districtchargedelete = exports.districtchargeupdate = exports.districtchargecreate = exports.districtcharge = void 0;
const district_1 = __importDefault(require("../../models/district"));
const districtcharge_1 = __importDefault(require("../../models/districtcharge"));
const member_1 = __importDefault(require("../../models/member"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const districtcharge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        districtcharge: yield districtcharge_1.default.find({
            state: "activated",
        }),
    });
});
exports.districtcharge = districtcharge;
const districtchargecreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { districtchargename, idmember, iddistrict } = req.body;
    const districtcharge = new districtcharge_1.default({
        districtchargecode: (0, codegenerate_1.default)(),
        districtchargename: districtchargename ? districtchargename : null,
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        iddistrict: iddistrict
            ? yield (0, idcode_1.default)(district_1.default, { districtcode: iddistrict })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const districtchargeresult = yield districtcharge.save();
    return res.json({
        districtcharge: districtchargeresult,
    });
});
exports.districtchargecreate = districtchargecreate;
const districtchargeupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { districtchargename, idmember, iddistrict } = req.body;
    yield districtcharge_1.default.findOneAndUpdate({
        districtchargecode: code,
    }, {
        districtchargename: districtchargename ? districtchargename : null,
        idmember: idmember
            ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember })
            : null,
        iddistrict: iddistrict
            ? yield (0, idcode_1.default)(district_1.default, { districtcode: iddistrict })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        districtcharge: yield districtcharge_1.default.findOne({
            districtchargecode: code,
        }),
    });
});
exports.districtchargeupdate = districtchargeupdate;
const districtchargedelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const nombre = yield districtcharge_1.default.findOne({
        districtchargecode: code,
    });
    if (nombre) {
        yield districtcharge_1.default.findOneAndUpdate({
            districtchargecode: code,
        }, {
            districtchargename: `${nombre.districtchargename} (eliminado) ${(0, codegenerate_1.default)()}`,
            membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
            state: "deleted",
            datedelete: (0, dategenerate_1.default)(),
        });
    }
    return res.json({
        districtcharge: yield districtcharge_1.default.findOne({
            districtchargecode: code,
        }),
    });
});
exports.districtchargedelete = districtchargedelete;

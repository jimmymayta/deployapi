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
exports.churchdelete = exports.churchupdate = exports.churchcreate = exports.church = void 0;
const church_1 = __importDefault(require("../../models/church"));
const district_1 = __importDefault(require("../../models/district"));
const department_1 = __importDefault(require("../../models/department"));
const member_1 = __importDefault(require("../../models/member"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const church = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const churchresult = yield church_1.default.find({ state: "activated" });
    return res.json({
        church: churchresult,
    });
});
exports.church = church;
const churchcreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { churchname, churchaddress, iddistrict, iddepartment } = req.body;
    const churchmodel = new church_1.default({
        churchcode: (0, codegenerate_1.default)(),
        churchname: churchname ? churchname : null,
        churchaddress: churchaddress ? churchaddress : null,
        iddistrict: yield (0, idcode_1.default)(district_1.default, { districtcode: iddistrict }),
        iddepartment: yield (0, idcode_1.default)(department_1.default, {
            departmentcode: iddepartment,
        }),
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const churchresult = yield churchmodel.save();
    return res.json({
        church: churchresult,
    });
});
exports.churchcreate = churchcreate;
const churchupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { churchname, churchaddress, iddistrict, iddepartment } = req.body;
    yield church_1.default.findOneAndUpdate({
        churchname: churchname ? churchname : null,
        churchaddress: churchaddress ? churchaddress : null,
        iddistrict: iddistrict ? yield (0, idcode_1.default)(district_1.default, { districtcode: iddistrict }) : null,
        iddepartment: iddepartment ? yield (0, idcode_1.default)(department_1.default, { departmentcode: iddepartment }) : null,
    });
    return res.json({
        church: yield church_1.default.findOne({ churchcode: code }),
    });
});
exports.churchupdate = churchupdate;
const churchdelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const nombre = yield church_1.default.findOne({ churchcode: code });
    yield church_1.default.findOneAndUpdate({ churchcode: code }, {
        churchname: `${nombre === null || nombre === void 0 ? void 0 : nombre.churchname} (eliminado) - ${(0, codegenerate_1.default)()}`,
        state: "deleted",
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        church: yield church_1.default.findOne({ churchcode: code }),
    });
});
exports.churchdelete = churchdelete;
//# sourceMappingURL=church.js.map
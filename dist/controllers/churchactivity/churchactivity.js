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
exports.churchactivitydelete = exports.churchactivityupdate = exports.churchactivitycreate = exports.churchactivity = void 0;
const church_1 = __importDefault(require("../../models/church"));
const churchactivity_1 = __importDefault(require("../../models/churchactivity"));
const member_1 = __importDefault(require("../../models/member"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const churchactivity_2 = require("../../helpers/fileimage/churchactivity");
const churchactivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const churchactivityresult = yield churchactivity_1.default.find({
        state: "activated",
    });
    return res.json({
        churchactivity: churchactivityresult,
    });
});
exports.churchactivity = churchactivity;
const churchactivitycreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { churchactivityname, churchactivitydescription, idchurch } = req.body;
    const { file } = req.files || { file: null };
    const mainimage = new churchactivity_1.default({
        churchactivitycode: (0, codegenerate_1.default)(),
        churchactivityname: churchactivityname ? churchactivityname : null,
        churchactivitydescription: churchactivitydescription
            ? churchactivitydescription
            : null,
        idchurch: idchurch
            ? yield (0, idcode_1.default)(church_1.default, { churchcode: idchurch })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const mainimageresult = yield mainimage.save();
    if (file) {
        const { imagename, imagefile, imagewidth, imageheight, imageextension } = yield (0, churchactivity_2.churchactivityuploadfile)(file, "images/churchactivity");
        yield churchactivity_1.default.findOneAndUpdate({
            churchactivitycode: mainimageresult.churchactivitycode,
        }, {
            churchactivityimagename: imagename,
            churchactivityimagefile: imagefile,
            churchactivityimagewidth: imagewidth,
            churchactivityimageheight: imageheight,
            churchactivityimageextension: imageextension,
        });
    }
    return res.json({
        churchactivity: yield churchactivity_1.default.findOne({
            churchactivitycode: mainimageresult.churchactivitycode,
        }),
    });
});
exports.churchactivitycreate = churchactivitycreate;
const churchactivityupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { churchactivityname, churchactivitydescription, idchurch } = req.body;
    const { file } = req.files || { file: null };
    const churchactivityresult = yield churchactivity_1.default.findOneAndUpdate({
        churchactivitycode: code,
    }, {
        churchactivityname: churchactivityname ? churchactivityname : null,
        churchactivitydescription: churchactivitydescription
            ? churchactivitydescription
            : null,
        idchurch: idchurch
            ? yield (0, idcode_1.default)(church_1.default, { churchcode: idchurch })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    if (file && churchactivityresult) {
        const { imagename, imagefile, imagewidth, imageheight, imageextension } = yield (0, churchactivity_2.churchactivityuploadfile)(file, "images/churchactivity");
        const churchactivityresult2 = yield churchactivity_1.default.findOneAndUpdate({
            churchactivitycode: code,
        }, {
            churchactivityimagename: imagename,
            churchactivityimagefile: imagefile,
            churchactivityimagewidth: imagewidth,
            churchactivityimageheight: imageheight,
            churchactivityimageextension: imageextension,
        });
        if (churchactivityresult2) {
            (0, churchactivity_2.churchactivitydeletefile)(churchactivityresult2.churchactivityimagefile, "images/churchactivity");
        }
    }
    return res.json({
        churchactivity: yield churchactivity_1.default.findOne({
            churchactivitycode: code,
        }),
    });
});
exports.churchactivityupdate = churchactivityupdate;
const churchactivitydelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const churchactivityresult = yield churchactivity_1.default.findOneAndUpdate({ churchactivitycode: code }, {
        state: "deleted",
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datedelete: (0, dategenerate_1.default)(),
    });
    if (churchactivityresult) {
        (0, churchactivity_2.churchactivitydeletefile)(churchactivityresult.churchactivityimagefile, "images/churchactivity");
    }
    return res.json({
        churchactivity: yield churchactivity_1.default.findOne({ churchactivitycode: code }),
    });
});
exports.churchactivitydelete = churchactivitydelete;
//# sourceMappingURL=churchactivity.js.map
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
exports.churchimagedelete = exports.churchimageupdate = exports.churchimagecreate = exports.churchimage = void 0;
const church_1 = __importDefault(require("../../models/church"));
const churchimage_1 = __importDefault(require("../../models/churchimage"));
const member_1 = __importDefault(require("../../models/member"));
const churchimage_2 = require("../../helpers/fileimage/churchimage");
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const churchimage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const churchresult = yield churchimage_1.default.find({ state: "activated" });
    return res.json({
        churchimage: churchresult,
    });
});
exports.churchimage = churchimage;
const churchimagecreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idchurch } = req.body;
    const { file } = req.files || { file: null };
    const { imagename, imagefile, imagewidth, imageheight, imageextension } = yield (0, churchimage_2.churchimageuploadfile)(file, "images/churchimage");
    const churchimage = new churchimage_1.default({
        churchimagecode: (0, codegenerate_1.default)(),
        churchimagename: imagename,
        churchimagefile: imagefile,
        churchimagewidth: imagewidth,
        churchimageheight: imageheight,
        churchimageextension: imageextension,
        idchurch: idchurch
            ? yield (0, idcode_1.default)(church_1.default, { churchcode: idchurch })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const churchimageresult = yield churchimage.save();
    return res.json({
        churchimage: churchimageresult,
    });
});
exports.churchimagecreate = churchimagecreate;
const churchimageupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { file } = req.files || { file: null };
    if (file) {
        const { imagename, imagefile, imagewidth, imageheight, imageextension } = yield (0, churchimage_2.churchimageuploadfile)(file, "images/churchimage");
        const churchimageresult = yield churchimage_1.default.findOneAndUpdate({
            churchimagecode: code,
        }, {
            churchimagename: imagename,
            churchimagefile: imagefile,
            churchimagewidth: imagewidth,
            churchimageheight: imageheight,
            churchimageextension: imageextension,
            membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
            dateupdate: (0, dategenerate_1.default)(),
        });
        if (churchimageresult !== null) {
            (0, churchimage_2.churchimagedeletefile)(churchimageresult.churchimagefile, "images/churchimage");
        }
        return res.json({
            churchimage: yield churchimage_1.default.findOne({ churchimagecode: code }),
        });
    }
    return res.json({
        churchimage: yield churchimage_1.default.findOne({ churchimagecode: code }),
    });
});
exports.churchimageupdate = churchimageupdate;
const churchimagedelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const churchimageresult = yield churchimage_1.default.findOneAndUpdate({
        churchimagecode: code,
    }, {
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    if (churchimageresult !== null) {
        (0, churchimage_2.churchimagedeletefile)(churchimageresult.churchimagefile, "images/churchimage");
    }
    return res.json({
        churchimage: yield churchimage_1.default.findOne({ churchimagecode: code }),
    });
});
exports.churchimagedelete = churchimagedelete;
//# sourceMappingURL=churchimage.js.map
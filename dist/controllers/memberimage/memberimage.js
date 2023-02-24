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
exports.memberimagedelete = exports.memberimageupdate = exports.memberimagecreate = exports.memberimage = void 0;
const member_1 = __importDefault(require("../../models/member"));
const memberimage_1 = __importDefault(require("../../models/memberimage"));
const memberimage_2 = require("../../helpers/fileimage/memberimage");
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const memberimage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberimageresult = yield memberimage_1.default.find({ state: "activated" });
    return res.json({
        memberimage: memberimageresult,
    });
});
exports.memberimage = memberimage;
const memberimagecreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idmember } = req.body;
    const { file } = req.files || { file: null };
    const { imagename, imagefile, imagewidth, imageheight, imageextension } = yield (0, memberimage_2.memberimageuploadfile)(file, "images/memberimage");
    const memberimage = new memberimage_1.default({
        memberimagecode: (0, codegenerate_1.default)(),
        memberimagename: imagename,
        memberimagefile: imagefile,
        memberimagewidth: imagewidth,
        memberimageheight: imageheight,
        memberimageextension: imageextension,
        idmember: idmember ? yield (0, idcode_1.default)(member_1.default, { membercode: idmember }) : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const memberimageresult = yield memberimage.save();
    return res.json({
        memberimage: memberimageresult,
    });
});
exports.memberimagecreate = memberimagecreate;
const memberimageupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { idmember } = req.body;
    const { file } = req.files || { file: null };
    const { imagename, imagefile, imagewidth, imageheight, imageextension } = yield (0, memberimage_2.memberimageuploadfile)(file, "images/memberimage");
    const memberimageresult = yield memberimage_1.default.findOneAndUpdate({
        memberimagecode: code,
    }, {
        memberimagename: imagename,
        memberimagefile: imagefile,
        memberimagewidth: imagewidth,
        memberimageheight: imageheight,
        memberimageextension: imageextension,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    if (memberimageresult !== null) {
        (0, memberimage_2.memberimagedeletefile)(memberimageresult.memberimagefile, "images/memberimage");
    }
    return res.json({
        memberimage: yield memberimage_1.default.findOne({ memberimagecode: code }),
    });
});
exports.memberimageupdate = memberimageupdate;
const memberimagedelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const memberimageresult = yield memberimage_1.default.findOneAndUpdate({
        memberimagecode: code,
    }, {
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    if (memberimageresult !== null) {
        (0, memberimage_2.memberimagedeletefile)(memberimageresult.memberimagefile, "images/memberimage");
    }
    return res.json({
        memberimage: yield memberimage_1.default.findOne({ memberimagecode: code }),
    });
});
exports.memberimagedelete = memberimagedelete;

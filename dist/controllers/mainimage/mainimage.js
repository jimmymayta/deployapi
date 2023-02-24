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
exports.mainimagedelete = exports.mainimageupdate = exports.mainimagecreate = exports.mainimage = void 0;
const path_1 = __importDefault(require("path"));
const member_1 = __importDefault(require("../../models/member"));
const mainimage_1 = __importDefault(require("../../models/mainimage"));
const mainimage_2 = require("../../helpers/fileimage/mainimage");
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const mainimage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainimageresult = yield mainimage_1.default.find({ state: "activated" });
    return res.json({
        mainimageresult: mainimageresult.map((e) => {
            return {
                mainimagecode: e.mainimagecode,
                mainimagetitle: e.mainimagetitle,
                mainimagedescription: e.mainimagedescription,
                mainimagefile: path_1.default.join(__dirname, "../../images/mainimage", e.mainimagefile),
            };
        }),
    });
});
exports.mainimage = mainimage;
const mainimagecreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const { file } = req.files || { file: null };
    const { imagename, imagefile, imagewidth, imageheight, imageextension } = yield (0, mainimage_2.mainimageuploadfile)(file, 'images/mainimage');
    const mainimage = new mainimage_1.default({
        mainimagecode: (0, codegenerate_1.default)(),
        mainimagetitle: title,
        mainimagedescription: description,
        mainimagename: imagename,
        mainimagefile: imagefile,
        mainimagewidth: imagewidth,
        mainimageheight: imageheight,
        mainimageextension: imageextension,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const mainimageresult = yield mainimage.save();
    return res.json({
        mainimage: mainimageresult,
    });
});
exports.mainimagecreate = mainimagecreate;
const mainimageupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { title, description } = req.body;
    const { file } = req.files || { file: null };
    const { imagename, imagefile, imagewidth, imageheight, imageextension } = yield (0, mainimage_2.mainimageuploadfile)(file, 'images/mainimage');
    const mainimageresult = yield mainimage_1.default.findOneAndUpdate({
        mainimagecode: code,
    }, {
        mainimagetitle: title,
        mainimagedescription: description,
        mainimagename: imagename,
        mainimagefile: imagefile,
        mainimagewidth: imagewidth,
        mainimageheight: imageheight,
        mainimageextension: imageextension,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    if (mainimageresult !== null) {
        (0, mainimage_2.mainimagedeletefile)(mainimageresult.mainimagefile, 'images/mainimage');
    }
    return res.json({
        mainimage: yield mainimage_1.default.findOne({ mainimagecode: code }),
    });
});
exports.mainimageupdate = mainimageupdate;
const mainimagedelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const mainimageresult = yield mainimage_1.default.findOneAndUpdate({
        mainimagecode: code,
    }, {
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    if (mainimageresult !== null) {
        (0, mainimage_2.mainimagedeletefile)(mainimageresult.mainimagefile, 'images/mainimage');
    }
    return res.json({
        mainimage: yield mainimage_1.default.findOne({ mainimagecode: code }),
    });
});
exports.mainimagedelete = mainimagedelete;

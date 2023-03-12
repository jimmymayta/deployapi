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
const member_1 = __importDefault(require("../../models/member"));
const mainimage_1 = __importDefault(require("../../models/mainimage"));
const mainimage_2 = require("../../helpers/fileimage/mainimage");
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const datainfomemberaccess_1 = require("../../helpers/datainfomemberaccess/datainfomemberaccess");
const filecontent_1 = __importDefault(require("../../helpers/filecontent/filecontent"));
const mainimage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainimageresult = yield mainimage_1.default.find({ state: "activated" }, {
        _id: 0,
        mainimagecode: 1,
        mainimagetitle: 1,
        mainimagedescription: 1,
        mainimagenumber: 1,
        mainimagefile: 1,
    }).sort({ mainimagenumber: "asc" });
    mainimageresult.forEach((mainimage) => (mainimage["mainimagefile"] = (0, filecontent_1.default)("images/mainimage", mainimage.mainimagefile)));
    return res.json({
        mainimage: mainimageresult,
        datainfo: yield (0, datainfomemberaccess_1.datainfomemberaccess)(req.code || "", "mainimage"),
    });
});
exports.mainimage = mainimage;
const mainimagecreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mainimagetitle, mainimagedescription, mainimagenumber } = req.body;
    const { file } = req.files || { file: null };
    const { imagename, imagefile, imagewidth, imageheight, imageextension } = yield (0, mainimage_2.mainimageuploadfile)(file, "images/mainimage");
    const mainimage = new mainimage_1.default({
        mainimagecode: (0, codegenerate_1.default)(),
        mainimagetitle: mainimagetitle ? mainimagetitle : "",
        mainimagedescription: mainimagedescription ? mainimagedescription : "",
        mainimagenumber: mainimagenumber ? mainimagenumber : "",
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
    const { mainimagetitle, mainimagedescription, mainimagenumber } = req.body;
    const mainimageresult = yield mainimage_1.default.findOneAndUpdate({
        mainimagecode: code,
    }, {
        mainimagetitle: mainimagetitle ? mainimagetitle : "",
        mainimagedescription: mainimagedescription ? mainimagedescription : "",
        mainimagenumber: mainimagenumber ? mainimagenumber : "",
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    const { file } = req.files || { file: null };
    if (file !== null) {
        const { imagename, imagefile, imagewidth, imageheight, imageextension } = yield (0, mainimage_2.mainimageuploadfile)(file, "images/mainimage");
        const mainimageresult = yield mainimage_1.default.findOneAndUpdate({
            mainimagecode: code,
        }, {
            mainimagename: imagename,
            mainimagefile: imagefile,
            mainimagewidth: imagewidth,
            mainimageheight: imageheight,
            mainimageextension: imageextension,
            membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
            dateupdate: (0, dategenerate_1.default)(),
        });
        if (mainimageresult !== null) {
            (0, mainimage_2.mainimagedeletefile)(mainimageresult.mainimagefile, "images/mainimage");
        }
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
        (0, mainimage_2.mainimagedeletefile)(mainimageresult.mainimagefile, "images/mainimage");
    }
    return res.json({
        mainimage: yield mainimage_1.default.findOne({ mainimagecode: code }),
    });
});
exports.mainimagedelete = mainimagedelete;

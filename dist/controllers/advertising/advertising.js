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
exports.advertisingdelete = exports.advertisingupdate = exports.advertisingcreate = exports.advertising = void 0;
const member_1 = __importDefault(require("../../models/member"));
const advertising_1 = __importDefault(require("../../models/advertising"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const advertising_2 = require("../../helpers/fileimage/advertising");
const advertising = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const advertisingresult = yield advertising_1.default.find({ state: "activated" });
    return res.json({
        advertising: advertisingresult,
    });
});
exports.advertising = advertising;
const advertisingcreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { advertisingname, advertisingdata, advertisingdescription, advertisingurl, } = req.body;
    const { file } = req.files || { file: null };
    const { imagename, imagefile, imagewidth, imageheight, imageextension } = yield (0, advertising_2.advertisinguploadfile)(file, "images/advertising");
    const advertising = new advertising_1.default({
        advertisingcode: (0, codegenerate_1.default)(),
        advertisingname,
        advertisingdata,
        advertisingdescription,
        advertisingimagename: imagename,
        advertisingimagefile: imagefile,
        advertisingimagewidth: imagewidth,
        advertisingimageheight: imageheight,
        advertisingimageextension: imageextension,
        advertisingurl,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const advertisingresult = yield advertising.save();
    return res.json({
        advertising: advertisingresult,
    });
});
exports.advertisingcreate = advertisingcreate;
const advertisingupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { advertisingname, advertisingdata, advertisingdescription, advertisingurl, } = req.body;
    yield advertising_1.default.findOneAndUpdate({ advertisingcode: code }, {
        advertisingname: advertisingname ? advertisingname : null,
        advertisingdata: advertisingdata ? advertisingdata : null,
        advertisingdescription: advertisingdescription
            ? advertisingdescription
            : null,
        advertisingurl: advertisingurl ? advertisingurl : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    const { file } = req.files || { file: null };
    if (file !== null) {
        const { imagename, imagefile, imagewidth, imageheight, imageextension } = yield (0, advertising_2.advertisinguploadfile)(file, "images/advertising");
        const advertisingresult = yield advertising_1.default.findOneAndUpdate({ advertisingcode: code }, {
            advertisingimagename: imagename,
            advertisingimagefile: imagefile,
            advertisingimagewidth: imagewidth,
            advertisingimageheight: imageheight,
            advertisingimageextension: imageextension,
            dateupdate: (0, dategenerate_1.default)(),
        });
        if (advertisingresult !== null) {
            (0, advertising_2.advertisingdeletefile)(advertisingresult.advertisingimagefile, "images/advertising");
        }
    }
    return res.json({
        advertising: yield advertising_1.default.findOne({ advertisingcode: code }),
    });
});
exports.advertisingupdate = advertisingupdate;
const advertisingdelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const advertisingname = yield advertising_1.default.findOne({
        advertisingcode: code,
    });
    if (advertisingname === null) {
        return res.json({
            erroro: "no existe code",
        });
    }
    yield advertising_1.default.findOneAndUpdate({ advertisingcode: code }, {
        advertisingname: `${advertisingname.advertisingname} (eliminado) - ${(0, codegenerate_1.default)()}`,
        state: "deleted",
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datedelete: (0, dategenerate_1.default)(),
    });
    (0, advertising_2.advertisingdeletefile)(advertisingname.advertisingimagefile, "images/advertising");
    return res.json({
        advertising: yield advertising_1.default.findOne({ advertisingcode: code }),
    });
});
exports.advertisingdelete = advertisingdelete;
//# sourceMappingURL=advertising.js.map
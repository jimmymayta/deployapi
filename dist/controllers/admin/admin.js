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
exports.admin = void 0;
const member_1 = __importDefault(require("../../models/member"));
const memberaccess_1 = __importDefault(require("../../models/memberaccess"));
const memberqrcode_1 = __importDefault(require("../../models/memberqrcode"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const qrcode_1 = __importDefault(require("../../helpers/qrcode/qrcode"));
const folder_1 = require("../../libraries/folder");
const admincode_1 = __importDefault(require("../../libraries/admincode"));
const dataamemberccess_1 = require("../../data/dataamemberccess");
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const random_1 = require("../../tools/random");
const env_1 = __importDefault(require("../../environments/env"));
const admin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    if (!(0, admincode_1.default)(code)) {
        return res.json({ message: "error" });
    }
    const modelmember = new member_1.default({
        membercode: (0, codegenerate_1.default)(),
        names: (0, random_1.randomstring)(),
        firstlastname: (0, random_1.randomstring)(),
        secondlastname: (0, random_1.randomstring)(),
        identitycard: (0, random_1.randominteger)(),
        datestart: (0, dategenerate_1.default)(),
        datecreate: (0, dategenerate_1.default)(),
    });
    const memberdata = yield modelmember.save();
    const accessdata = dataamemberccess_1.accessname.map((e) => {
        return {
            memberaccesscode: (0, codegenerate_1.default)(),
            memberaccessnumber: e.number,
            memberaccessname: e.name,
            memberaccesscreate: true,
            memberaccessupdate: true,
            memberaccessdelete: true,
            memberaccesslevel: "national",
            idmember: memberdata._id,
        };
    });
    yield memberaccess_1.default.insertMany(accessdata);
    (0, folder_1.folder)("images/memberqrcode");
    const qrname = (0, codegenerate_1.default)();
    const qrdata = `${env_1.default.urlapi}/code/${memberdata.membercode}`;
    const { imageextension, imagewidth, imageheight } = yield (0, qrcode_1.default)(qrname, qrdata);
    yield memberqrcode_1.default.insertMany({
        memberqrcodecode: (0, codegenerate_1.default)(),
        memberqrcodename: (0, codegenerate_1.default)(),
        memberqrcodedata: qrdata,
        memberqrcodefile: `${qrname}.png`,
        memberqrcodewidth: imagewidth,
        memberqrcodeheight: imageheight,
        memberqrcodeextension: imageextension,
        idmember: memberdata._id,
    });
    return res.json({ ci: memberdata.identitycard });
});
exports.admin = admin;

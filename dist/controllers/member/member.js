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
exports.membergeneratecredential = exports.membergeneratepdf = exports.memberdelete = exports.memberupdate = exports.membercreate = exports.member = void 0;
const church_1 = __importDefault(require("../../models/church"));
const district_1 = __importDefault(require("../../models/district"));
const department_1 = __importDefault(require("../../models/department"));
const member_1 = __importDefault(require("../../models/member"));
const memberaccess_1 = __importDefault(require("../../models/memberaccess"));
const memberqrcode_1 = __importDefault(require("../../models/memberqrcode"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const member_2 = require("../../helpers/filedocument/member");
const membercredential_1 = require("../../helpers/filedocument/membercredential");
const dataamemberccess_1 = require("../../data/dataamemberccess");
const folder_1 = require("../../libraries/folder");
const env_1 = __importDefault(require("../../environments/env"));
const qrcode_1 = __importDefault(require("../../helpers/qrcode/qrcode"));
const accessverify_1 = require("../../helpers/access/accessverify");
const member = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberresult = yield member_1.default.find({ state: "activated" });
    return res.json({
        member: memberresult,
        tab: yield (0, accessverify_1.accessverify)(req.code || ""),
    });
});
exports.member = member;
const membercreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { names, firstlastname, secondlastname, gender, identitycard, email, cellular, birthdate, married, country, iddepartment, address, datestart, dateend, idchurch, iddistrict, } = req.body;
    const membermodel = new member_1.default({
        membercode: (0, codegenerate_1.default)(),
        names: names ? names : null,
        firstlastname: firstlastname ? firstlastname : null,
        secondlastname: secondlastname ? secondlastname : null,
        gender: gender ? gender : null,
        identitycard: identitycard ? identitycard : null,
        email: email ? email : null,
        cellular: cellular ? cellular : null,
        birthdate: birthdate ? birthdate : null,
        married: married ? married : null,
        country: country ? country : null,
        iddepartment: iddepartment
            ? yield (0, idcode_1.default)(department_1.default, { departmentcode: iddepartment })
            : null,
        address: address ? address : null,
        datestart: datestart ? datestart : null,
        dateend: dateend ? dateend : null,
        idchurch: idchurch
            ? yield (0, idcode_1.default)(church_1.default, { churchcode: idchurch })
            : null,
        iddistrict: iddistrict
            ? yield (0, idcode_1.default)(district_1.default, { districtcode: iddistrict })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        datecreate: (0, dategenerate_1.default)(),
    });
    const memberresult = yield membermodel.save();
    const accessdata = dataamemberccess_1.accessname.map((e) => {
        return {
            memberaccesscode: (0, codegenerate_1.default)(),
            memberaccessnumber: e.number,
            memberaccessname: e.name,
            memberaccesscreate: true,
            memberaccessupdate: false,
            memberaccessdelete: true,
            memberaccesslevel: "personal",
            idmember: memberresult._id,
        };
    });
    yield memberaccess_1.default.insertMany(accessdata.filter((e) => [4, 5].includes(e.memberaccessnumber)));
    (0, folder_1.folder)("/images/memberqrcode");
    const qrname = (0, codegenerate_1.default)();
    const qrdata = `${env_1.default.urlapi}/code/${memberresult.membercode}`;
    const { imageextension, imagewidth, imageheight } = yield (0, qrcode_1.default)(qrname, qrdata);
    yield memberqrcode_1.default.insertMany({
        memberqrcodecode: (0, codegenerate_1.default)(),
        memberqrcodename: (0, codegenerate_1.default)(),
        memberqrcodedata: qrdata,
        memberqrcodefile: `${qrname}.png`,
        memberqrcodewidth: imagewidth,
        memberqrcodeheight: imageheight,
        memberqrcodeextension: imageextension,
        idmember: memberresult._id,
    });
    return res.json({
        member: memberresult,
    });
});
exports.membercreate = membercreate;
const memberupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { names, firstlastname, secondlastname, gender, identitycard, email, cellular, birthdate, married, country, iddepartment, address, datestart, dateend, idchurch, iddistrict, } = req.body;
    yield member_1.default.findOneAndUpdate({
        membercode: code,
    }, {
        names: names ? names : null,
        firstlastname: firstlastname ? firstlastname : null,
        secondlastname: secondlastname ? secondlastname : null,
        gender: gender ? gender : null,
        identitycard: identitycard ? identitycard : null,
        email: email ? email : null,
        cellular: cellular ? cellular : null,
        birthdate: birthdate ? birthdate : null,
        married: married ? married : null,
        country: country ? country : null,
        iddepartment: iddepartment
            ? yield (0, idcode_1.default)(department_1.default, { departmentcode: iddepartment })
            : null,
        address: address ? address : null,
        datestart: datestart ? datestart : null,
        dateend: dateend ? dateend : null,
        idchurch: idchurch
            ? yield (0, idcode_1.default)(church_1.default, { churchcode: idchurch })
            : null,
        iddistrict: iddistrict
            ? yield (0, idcode_1.default)(district_1.default, { districtcode: iddistrict })
            : null,
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        dateupdate: (0, dategenerate_1.default)(),
    });
    return res.json({
        member: yield member_1.default.findOne({ membercode: code }),
    });
});
exports.memberupdate = memberupdate;
const memberdelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    yield member_1.default.findOneAndUpdate({
        membercode: code,
    }, {
        membermember: yield (0, idcode_1.default)(member_1.default, { membercode: req.code }),
        state: "deleted",
        datedelete: (0, dategenerate_1.default)(),
    });
    return res.json({
        member: yield member_1.default.findOne({ membercode: code }),
    });
});
exports.memberdelete = memberdelete;
const membergeneratepdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const memberresult = yield member_1.default.findOne({ membercode: code });
    let pathfile = "";
    if (memberresult) {
        pathfile = yield (0, member_2.memberpdf)(memberresult.names, "temp");
    }
    return res.json({
        membergeneratepdf: `${env_1.default.urlapi}/${pathfile}`,
    });
});
exports.membergeneratepdf = membergeneratepdf;
const membergeneratecredential = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const memberresult = yield member_1.default.aggregate([
        {
            $match: { membercode: code },
        },
        {
            $lookup: {
                from: "memberimage",
                localField: "_id",
                foreignField: "idmember",
                as: "memberimage",
            },
        },
        {
            $unwind: "$memberimage",
        },
        {
            $lookup: {
                from: "memberqrcode",
                localField: "_id",
                foreignField: "idmember",
                as: "memberqrcode",
            },
        },
        {
            $unwind: "$memberqrcode",
        },
    ]);
    let pathfile = "";
    if (memberresult.length > 0) {
        pathfile = yield (0, membercredential_1.membercredential)(memberresult[0].names, memberresult[0].memberimage.memberimagefile, memberresult[0].memberqrcode.memberqrcodefile, "temp");
    }
    return res.json({
        membergeneratecredential: `${env_1.default.urlapi}/${pathfile}`,
    });
});
exports.membergeneratecredential = membergeneratecredential;

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
exports.maincreate = exports.main = void 0;
const main_1 = __importDefault(require("../../models/main"));
const mainimage_1 = __importDefault(require("../../models/mainimage"));
const datamain_1 = __importDefault(require("../../data/datamain"));
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const dategenerate_1 = __importDefault(require("../../libraries/dategenerate"));
const member_1 = __importDefault(require("../../models/member"));
const idcode_1 = __importDefault(require("../../libraries/idcode"));
const accessverify_1 = require("../../helpers/access/accessverify");
const main = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [maintitle, maincomment, maindescription, maindetail, mainimage] = yield Promise.all([
        main_1.default.findOne({ mainname: datamain_1.default.maintitle }),
        main_1.default.findOne({ mainname: datamain_1.default.maincomment }),
        main_1.default.findOne({ mainname: datamain_1.default.maindescription }),
        main_1.default.findOne({ mainname: datamain_1.default.maindetail }),
        mainimage_1.default.find(),
    ]);
    return res.json({
        maintitle: maintitle !== null ? maintitle.maindata : "",
        maincomment: maincomment !== null ? maincomment.maindata : "",
        maindescription: maindescription !== null ? maindescription.maindata : "",
        maindetail: maindetail !== null ? maindetail.maindata : "",
        tab: yield (0, accessverify_1.accessverify)(req.code || '')
    });
});
exports.main = main;
const maincreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { maintitle, maincomment, maindescription, maindetail } = req.body;
    const maintitlename = yield main_1.default.findOne({
        mainname: datamain_1.default.maintitle,
    });
    const maincommentname = yield main_1.default.findOne({
        mainname: datamain_1.default.maincomment,
    });
    const maindescriptionname = yield main_1.default.findOne({
        mainname: datamain_1.default.maindescription,
    });
    const maindetailname = yield main_1.default.findOne({
        mainname: datamain_1.default.maindetail,
    });
    const idmember = yield (0, idcode_1.default)(member_1.default, { membercode: req.code });
    if (maintitlename === null) {
        maindatacreate(datamain_1.default.maintitle, maintitle ? maintitle : "", idmember);
    }
    else {
        maindataupdate(datamain_1.default.maintitle, maintitle ? maintitle : "", idmember);
    }
    if (maincommentname === null) {
        maindatacreate(datamain_1.default.maincomment, maincomment ? maincomment : "", idmember);
    }
    else {
        maindataupdate(datamain_1.default.maincomment, maincomment ? maincomment : "", idmember);
    }
    if (maindescriptionname === null) {
        maindatacreate(datamain_1.default.maindescription, maindescription ? maindescription : "", idmember);
    }
    else {
        maindataupdate(datamain_1.default.maindescription, maindescription ? maindescription : "", idmember);
    }
    if (maindetailname === null) {
        maindatacreate(datamain_1.default.maindetail, maindetail ? maindetail : "", idmember);
    }
    else {
        maindataupdate(datamain_1.default.maindetail, maindetail ? maindetail : "", idmember);
    }
    return res.json({
        maintitle: yield main_1.default.findOne({ mainname: datamain_1.default.maintitle }),
        maincomment: yield main_1.default.findOne({ mainname: datamain_1.default.maincomment }),
        maindescription: yield main_1.default.findOne({
            mainname: datamain_1.default.maindescription,
        }),
        maindetail: yield main_1.default.findOne({ mainname: datamain_1.default.maindetail }),
    });
});
exports.maincreate = maincreate;
function maindatacreate(mainname, maindata, membermember) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = new main_1.default({
            maincode: (0, codegenerate_1.default)(),
            mainname,
            maindata,
            membermember,
            datecreate: (0, dategenerate_1.default)(),
        });
        yield data.save();
    });
}
function maindataupdate(mainname, maindata, membermember) {
    return __awaiter(this, void 0, void 0, function* () {
        yield main_1.default.findOneAndUpdate({
            mainname,
        }, {
            maindata,
            membermember,
            dateupdate: (0, dategenerate_1.default)(),
        });
    });
}

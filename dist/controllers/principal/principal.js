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
exports.principalinfo = exports.principalcontact = exports.principalnosotros = exports.principalchurch = exports.principalhome = void 0;
const path_1 = __importDefault(require("path"));
const main_1 = __importDefault(require("../../models/main"));
const mainimage_1 = __importDefault(require("../../models/mainimage"));
const nosotros_1 = __importDefault(require("../../models/nosotros"));
const contact_1 = __importDefault(require("../../models/contact"));
const datamain_1 = __importDefault(require("../../data/datamain"));
const datanosotros_1 = __importDefault(require("../../data/datanosotros"));
const datacontact_1 = __importDefault(require("../../data/datacontact"));
const dataaccess_1 = __importDefault(require("../../data/dataaccess"));
const dataadmin_1 = __importDefault(require("../../data/dataadmin"));
const environment_1 = __importDefault(require("../../environments/environment"));
const principalhome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [maintitle, maincomment, maindescription, maindetail, mainimage] = yield Promise.all([
        main_1.default.findOne({ maintitle: datamain_1.default.maintitle }),
        main_1.default.findOne({ maincomment: datamain_1.default.maincomment }),
        main_1.default.findOne({ maindescription: datamain_1.default.maindescription }),
        main_1.default.findOne({ maindetail: datamain_1.default.maindetail }),
        mainimage_1.default.find(),
    ]);
    return res.json({
        tab: dataaccess_1.default
            .filter((e) => [1, 2, 3].includes(e.number))
            .map((e) => e.name),
        maintitle: 'IGLESIA EVANGELICA BOLIVIANA DE SANTIDAD',
        maincomment,
        maindescription,
        maindetail,
        mainimage: mainimage.map((e) => path_1.default.join(__dirname, "../../images/mainimage/", e.mainimagefile)),
    });
});
exports.principalhome = principalhome;
const principalchurch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        maintitle: "Iglesia",
    });
});
exports.principalchurch = principalchurch;
const principalnosotros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [nosotrostitle, nosotroscomment, nosotrosdescription, nosotrosdetail] = yield Promise.all([
        nosotros_1.default.findOne({ nosotrostitle: datanosotros_1.default.nosotrostitle }),
        nosotros_1.default.findOne({ nosotroscomment: datanosotros_1.default.nosotroscomment }),
        nosotros_1.default.findOne({
            nosotrosdescription: datanosotros_1.default.nosotrosdescription,
        }),
        nosotros_1.default.findOne({ nosotrosdetail: datanosotros_1.default.nosotrosdetail }),
    ]);
    return res.json({
        tab: dataaccess_1.default
            .filter((e) => [1, 2, 3].includes(e.number))
            .map((e) => e.name),
        nosotrostitle,
        nosotroscomment,
        nosotrosdescription,
        nosotrosdetail,
    });
});
exports.principalnosotros = principalnosotros;
const principalcontact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [contacttitle, contactcomment, contactdescription, contactdetail] = yield Promise.all([
        contact_1.default.findOne({ contacttitle: datacontact_1.default.contacttitle }),
        contact_1.default.findOne({ contactcomment: datacontact_1.default.contactcomment }),
        contact_1.default.findOne({
            contactdescription: datacontact_1.default.contactdescription,
        }),
        contact_1.default.findOne({ contactdetail: datacontact_1.default.contactdetail }),
    ]);
    return res.json({
        tab: dataaccess_1.default
            .filter((e) => [1, 2, 3].includes(e.number))
            .map((e) => e.name),
        contacttitle,
        contactcomment,
        contactdescription,
        contactdetail,
    });
});
exports.principalcontact = principalcontact;
const principalinfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(dataadmin_1.default);
    return res.json({
        dataadmin: dataadmin_1.default,
        build: environment_1.default.apibuild
    });
});
exports.principalinfo = principalinfo;
//# sourceMappingURL=principal.js.map
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
exports.mainimagecreate = exports.mainupdate = exports.main = void 0;
const main_1 = __importDefault(require("../../models/main"));
const mainimage_1 = __importDefault(require("../../models/mainimage"));
const datamain_1 = __importDefault(require("../../data/datamain"));
const dataaccess_1 = __importDefault(require("../../data/dataaccess"));
const main = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        maintitle,
        maincomment,
        maindescription,
        maindetail,
        mainimage,
    });
});
exports.main = main;
const mainupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        maintitle,
        maincomment,
        maindescription,
        maindetail,
        mainimage,
    });
});
exports.mainupdate = mainupdate;
const mainimagecreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        tab: dataaccess_1.default
            .filter((e) => [1, 2, 3].includes(e.number))
            .map((e) => e.name),
    });
});
exports.mainimagecreate = mainimagecreate;
//# sourceMappingURL=main.js.map
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
exports.memberpdf = void 0;
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const folder_1 = require("../../libraries/folder");
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const memberpdf = (names, filedir) => __awaiter(void 0, void 0, void 0, function* () {
    const pathfile = (0, path_1.join)(`${__dirname}/../../${filedir}/${(0, codegenerate_1.default)()}.pdf`);
    const LatoRegular = (0, path_1.join)(`${__dirname}/../../files/fonts/Lato-Regular.ttf`);
    const LatoBold = (0, path_1.join)(`${__dirname}/../../files/fonts/Lato-Bold.ttf`);
    (0, folder_1.folder)(filedir);
    const doc = new pdfkit_1.default({ size: "LETTER" });
    doc.pipe(fs_1.default.createWriteStream(pathfile));
    doc.roundedRect(20, 20, 572, 752, 10).lineWidth(2).stroke("#0d47a1");
    doc
        .font(LatoBold)
        .fontSize(20)
        .fillColor("#0d47a1")
        .text(`Iglesia Evangélica Boliviana de Santidad - ${names}`, 20, 30, {
        width: 572,
        align: "center",
    });
    doc.end();
    return pathfile;
});
exports.memberpdf = memberpdf;

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
exports.membercredential = void 0;
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const folder_1 = require("../../libraries/folder");
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const membercredential = (names, memberimage, memberqrcode, pathdir) => __awaiter(void 0, void 0, void 0, function* () {
    const file = `${(0, codegenerate_1.default)()}.pdf`;
    const imagenmember = (0, path_1.join)(`${__dirname}/../../files/images/memberimage/${memberimage}`);
    const imagenqrcode = (0, path_1.join)(`${__dirname}/../../files/images/memberqrcode/${memberqrcode}`);
    const pathfile = (0, path_1.join)(`${__dirname}/../../files/${pathdir}/${file}`);
    const imagecredential = (0, path_1.join)(`${__dirname}/../../files/images/imagecredential/imagecredential1.png`);
    const LatoRegular = (0, path_1.join)(`${__dirname}/../../files/fonts/Lato-Regular.ttf`);
    const LatoBold = (0, path_1.join)(`${__dirname}/../../files/fonts/Lato-Bold.ttf`);
    (0, folder_1.folder)(pathdir);
    const doc = new pdfkit_1.default({ size: "LETTER" });
    doc.pipe(fs_1.default.createWriteStream(pathfile));
    doc.image(imagecredential, 100, 100, { width: 250, height: 150 });
    doc.image(imagenmember, 105, 155, { fit: [80, 80] });
    doc.image(imagenqrcode, 305, 195, { fit: [40, 40] });
    doc
        .font(LatoBold)
        .fontSize(12)
        .fillColor("#0d47a1")
        .text(`${names.toUpperCase()}`, 170, 160);
    doc.end();
    return `${pathdir}/${file}`;
});
exports.membercredential = membercredential;

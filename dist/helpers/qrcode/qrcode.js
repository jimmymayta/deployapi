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
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const qrcode_1 = __importDefault(require("qrcode"));
const qrcode = (name, data) => __awaiter(void 0, void 0, void 0, function* () {
    const qrimage = path_1.default.join(__dirname, `../../files/images/memberqrcode/${name}.png`);
    yield qrcode_1.default.toFile(qrimage, data, {
        type: "png",
        margin: 1,
        width: 500,
        color: {
            dark: "#000",
            light: "#FFF",
        },
        errorCorrectionLevel: "L",
    })
        .catch((err) => {
        console.error("Error QR");
        console.error(err);
    });
    const { format: imageextension, width: imagewidth, height: imageheight, } = yield (0, sharp_1.default)(qrimage).metadata();
    return { imageextension, imagewidth, imageheight };
});
exports.default = qrcode;

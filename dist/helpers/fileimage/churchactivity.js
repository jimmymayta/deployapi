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
exports.churchactivitydeletefile = exports.churchactivityuploadfile = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const folder_1 = require("../../libraries/folder");
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const churchactivityuploadfile = (file, filedir) => __awaiter(void 0, void 0, void 0, function* () {
    const codename = (0, codegenerate_1.default)();
    const codefile = (0, codegenerate_1.default)();
    const pathfileimage = path_1.default.join(__dirname, "../../", filedir, `${codefile}.png`);
    (0, folder_1.folder)(filedir);
    const { width = 0, height = 0 } = yield (0, sharp_1.default)(file.tempFilePath).metadata();
    if (width === height) {
        yield (0, sharp_1.default)(file.tempFilePath)
            .resize(Math.round((70 / 100) * height) + height, height)
            .toFile(pathfileimage);
    }
    if (width > height) {
        yield (0, sharp_1.default)(file.tempFilePath)
            .resize(Math.round((70 / 100) * width) + width, width)
            .toFile(pathfileimage);
    }
    if (width < height) {
        yield (0, sharp_1.default)(file.tempFilePath)
            .resize(Math.round((70 / 100) * height) + height, height)
            .toFile(pathfileimage);
    }
    const { format: imageextension, width: imagewidth, height: imageheight, } = yield (0, sharp_1.default)(pathfileimage).metadata();
    return {
        imagename: codename,
        imagefile: `${codefile}.png`,
        imagewidth,
        imageheight,
        imageextension,
    };
});
exports.churchactivityuploadfile = churchactivityuploadfile;
const churchactivitydeletefile = (file, filedir) => __awaiter(void 0, void 0, void 0, function* () {
    const pathfileimage = path_1.default.join(__dirname, "../../", filedir, `${file}`);
    if (fs_1.default.existsSync(pathfileimage)) {
        fs_1.default.unlinkSync(pathfileimage);
    }
});
exports.churchactivitydeletefile = churchactivitydeletefile;

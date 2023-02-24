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
exports.memberdocumentdeletefile = exports.memberdocumentuploadfile = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const folder_1 = require("../../libraries/folder");
const codegenerate_1 = __importDefault(require("../../libraries/codegenerate"));
const memberdocumentuploadfile = (file, filedir) => __awaiter(void 0, void 0, void 0, function* () {
    const codefile = (0, codegenerate_1.default)();
    const extension = file.name.split(".")[file.name.split(".").length - 1];
    const pathfile = path_1.default.join(`${__dirname}/../../${filedir}/${codefile}.${extension}`);
    (0, folder_1.folder)(filedir);
    file.mv(pathfile);
    return {
        documentname: (0, codegenerate_1.default)(),
        documentfile: `${codefile}.${extension}`,
        documentextension: extension,
    };
});
exports.memberdocumentuploadfile = memberdocumentuploadfile;
const memberdocumentdeletefile = (file, filedir) => {
    const docfile = path_1.default.join(`${__dirname}/../../${filedir}/${file}`);
    if (fs_1.default.existsSync(docfile)) {
        fs_1.default.unlinkSync(docfile);
    }
};
exports.memberdocumentdeletefile = memberdocumentdeletefile;

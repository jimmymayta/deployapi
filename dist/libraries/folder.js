"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.foldercheck = exports.folder = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const foldercheck = (data) => {
    return fs_1.default.existsSync(path_1.default.join(`${__dirname}/../files/${data}`));
};
exports.foldercheck = foldercheck;
const folder = (data) => {
    if (!foldercheck(data)) {
        fs_1.default.mkdirSync(path_1.default.join(`${__dirname}/../files/${data}`), { recursive: true });
    }
    return foldercheck(data);
};
exports.folder = folder;

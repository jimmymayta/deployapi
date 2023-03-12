"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../../environments/env"));
const filecontent = (filepath, file) => {
    return `${env_1.default.urlapi}/${filepath}/${file}`;
};
exports.default = filecontent;

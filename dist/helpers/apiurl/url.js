"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlapp = exports.urlapi = void 0;
const environment_1 = __importDefault(require("../../environments/environment"));
const urlapi = () => {
    return environment_1.default.apiproduction ? `${environment_1.default.urlapipro}` : `${environment_1.default.urlapidev}`;
};
exports.urlapi = urlapi;
const urlapp = () => {
    return environment_1.default.apiproduction ? `${environment_1.default.urlapppro}` : `${environment_1.default.urlappdev}`;
};
exports.urlapp = urlapp;
//# sourceMappingURL=url.js.map
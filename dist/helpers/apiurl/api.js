"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = __importDefault(require("../../environments/environment"));
const name = environment_1.default.apiname.length > 0 ? `/${environment_1.default.apiname}` : "";
const version = environment_1.default.apiversion.length > 0 ? `/${environment_1.default.apiversion}` : "";
exports.default = `${name}${version}`;
//# sourceMappingURL=api.js.map
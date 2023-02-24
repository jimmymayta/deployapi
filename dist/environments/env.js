"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = __importDefault(require("./environment"));
exports.default = {
    apiname: environment_1.default.apiname,
    apiversion: environment_1.default.apiversion,
    apibuild: environment_1.default.apibuild,
    apiport: Number(process.env.PORT) || environment_1.default.apiport,
    apiproduction: environment_1.default.apiproduction,
    database: environment_1.default.database,
    uri: environment_1.default.apiproduction ? environment_1.default.uripro : environment_1.default.uridev,
    urlapi: environment_1.default.apiproduction ? environment_1.default.urlapipro : environment_1.default.urlapidev,
    urlapp: environment_1.default.apiproduction ? environment_1.default.urlapppro : environment_1.default.urlappdev,
    keysecret: environment_1.default.keysecret,
};

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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const env_1 = __importDefault(require("../environments/env"));
const routes_1 = __importDefault(require("../routes/routes"));
const database_1 = __importDefault(require("../database/database"));
class Server {
    constructor(app = (0, express_1.default)(), port = env_1.default.apiport) {
        this.app = app;
        this.port = port;
        this.connectiondatabase();
        this.middlewares();
        this.routes(routes_1.default);
    }
    connectiondatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.default)();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)({ origin: env_1.default.urlapp }));
        this.app.use(express_1.default.json({ limit: "100mb" }));
        this.app.use(express_1.default.urlencoded({ extended: false, limit: "100mb" }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../files')));
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: path_1.default.join(__dirname, "../tmp"),
            createParentPath: true,
        }));
    }
    routes(route) {
        const url = `/${env_1.default.apiname}/${env_1.default.apiversion}/`;
        route.forEach((e) => this.app.use(`${url}${e.routepath}`, e.route));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`${env_1.default.urlapi}:${env_1.default.apiport}`);
        });
    }
}
exports.default = Server;

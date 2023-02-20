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
const environment_1 = __importDefault(require("../environments/environment"));
const routes_1 = require("../routes/routes");
const database_1 = __importDefault(require("../database/database"));
const url_1 = require("../helpers/apiurl/url");
const api_1 = __importDefault(require("../helpers/apiurl/api"));
class Server {
    constructor(app = (0, express_1.default)(), port = environment_1.default.apiport) {
        this.app = app;
        this.port = port;
        this.connectiondatabase();
        this.middlewares();
        this.routes([
            { routepath: "principal", route: routes_1.principalroute },
            { routepath: "admin", route: routes_1.adminroute },
            { routepath: "login", route: routes_1.loginroute },
            { routepath: "main", route: routes_1.mainroute },
            { routepath: "nosotros", route: routes_1.nosotrosroute },
            { routepath: "department", route: routes_1.departmentroute },
            { routepath: "district", route: routes_1.districtroute },
            { routepath: "mainimage", route: routes_1.mainimageroute },
            { routepath: "advertising", route: routes_1.advertisingroute },
            { routepath: "church", route: routes_1.churchroute },
            { routepath: "churchactivity", route: routes_1.churchactivityroute },
            { routepath: "churchimage", route: routes_1.churchimageroute },
            { routepath: "churchmap", route: routes_1.churchmaproute },
            { routepath: "churchministry", route: routes_1.churchministryroute },
            { routepath: "churchcharge", route: routes_1.churchchargeroute },
            { routepath: "member", route: routes_1.memberroute },
            { routepath: "memberimage", route: routes_1.memberimageroute },
            { routepath: "memberhistory", route: routes_1.memberhistoryroute },
            { routepath: "membermap", route: routes_1.membermaproute },
        ]);
    }
    connectiondatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.default)();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)({ origin: environment_1.default.urlappdev }));
        this.app.use(express_1.default.json({ limit: "100mb" }));
        this.app.use(express_1.default.urlencoded({ extended: false, limit: "100mb" }));
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: path_1.default.join(__dirname, "../tmp"),
            createParentPath: true,
        }));
    }
    routes(route) {
        route.forEach((e) => this.app.use(`${api_1.default}/${e.routepath}`, e.route));
    }
    listen() {
        this.app.listen(this.port, () => {
            const url = environment_1.default.apiproduction
                ? `${(0, url_1.urlapi)()}${api_1.default}`
                : `${(0, url_1.urlapi)()}:${this.port}${api_1.default}`;
            console.log(url);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map
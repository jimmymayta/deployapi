"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const principal_1 = __importDefault(require("./principal/principal"));
const admin_1 = __importDefault(require("./admin/admin"));
const login_1 = __importDefault(require("./login/login"));
const main_1 = __importDefault(require("./main/main"));
const nosotros_1 = __importDefault(require("./nosotros/nosotros"));
const member_1 = __importDefault(require("./member/member"));
const membermap_1 = __importDefault(require("./membermap/membermap"));
const memberimage_1 = __importDefault(require("./memberimage/memberimage"));
const memberhistory_1 = __importDefault(require("./memberhistory/memberhistory"));
const department_1 = __importDefault(require("./department/department"));
const district_1 = __importDefault(require("./district/district"));
const mainimage_1 = __importDefault(require("./mainimage/mainimage"));
const advertising_1 = __importDefault(require("./advertising/advertising"));
const church_1 = __importDefault(require("./church/church"));
const churchactivity_1 = __importDefault(require("./churchactivity/churchactivity"));
const churchimage_1 = __importDefault(require("./churchimage/churchimage"));
const churchmap_1 = __importDefault(require("./churchmap/churchmap"));
const churchministry_1 = __importDefault(require("./churchministry/churchministry"));
const churchcharge_1 = __importDefault(require("./churchcharge/churchcharge"));
const districtcharge_1 = __importDefault(require("./districtcharge/districtcharge"));
const income_1 = __importDefault(require("./income/income"));
exports.default = [
    { routepath: "principal", route: principal_1.default },
    { routepath: "admin", route: admin_1.default },
    { routepath: "login", route: login_1.default },
    { routepath: "main", route: main_1.default },
    { routepath: "nosotros", route: nosotros_1.default },
    { routepath: "department", route: department_1.default },
    { routepath: "district", route: district_1.default },
    { routepath: "mainimage", route: mainimage_1.default },
    { routepath: "advertising", route: advertising_1.default },
    { routepath: "church", route: church_1.default },
    { routepath: "churchactivity", route: churchactivity_1.default },
    { routepath: "churchimage", route: churchimage_1.default },
    { routepath: "churchmap", route: churchmap_1.default },
    { routepath: "churchministry", route: churchministry_1.default },
    { routepath: "churchcharge", route: churchcharge_1.default },
    { routepath: "member", route: member_1.default },
    { routepath: "memberimage", route: memberimage_1.default },
    { routepath: "memberhistory", route: memberhistory_1.default },
    { routepath: "membermap", route: membermap_1.default },
    { routepath: "districtcharge", route: districtcharge_1.default },
    { routepath: "income", route: income_1.default },
];
//# sourceMappingURL=routes.js.map
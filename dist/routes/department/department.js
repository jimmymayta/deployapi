"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const department_1 = require("../../controllers/department/department");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, department_1.department);
router.post("/create", token_1.default, department_1.departmentcreate);
router.post("/update/:code", token_1.default, department_1.departmentupdate);
router.get("/delete/:code", token_1.default, department_1.departmentdelete);
exports.default = router;
//# sourceMappingURL=department.js.map
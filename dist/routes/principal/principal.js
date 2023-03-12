"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const principal_1 = require("../../controllers/principal/principal");
const principal_2 = __importDefault(require("../../middlewares/principal/principal"));
const router = (0, express_1.Router)();
router.get("/main", [principal_2.default], principal_1.principalmain);
router.get("/church", [principal_2.default], principal_1.principalchurch);
router.get("/nosotros", [principal_2.default], principal_1.principalnosotros);
router.get("/contact", [principal_2.default], principal_1.principalcontact);
router.get("/info", [principal_2.default], principal_1.principalinfo);
exports.default = router;

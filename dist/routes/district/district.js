"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const district_1 = require("../../controllers/district/district");
const districtverify_1 = require("../../middlewares/verify/districtverify");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, district_1.district);
router.post("/create", [token_1.default, districtverify_1.districtnameverify], district_1.districtcreate);
router.post("/update/:code", [token_1.default, districtverify_1.districtcodeverify, districtverify_1.districtnameverify], district_1.districtupdate);
router.get("/delete/:code", [token_1.default, districtverify_1.districtcodeverify], district_1.districtdelete);
exports.default = router;

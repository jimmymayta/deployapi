"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const churchcharge_1 = require("../../controllers//churchcharge/churchcharge");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, churchcharge_1.churchcharge);
router.post("/create", token_1.default, churchcharge_1.churchchargecreate);
router.post("/update/:code", token_1.default, churchcharge_1.churchchargeupdate);
router.get("/delete/:code", token_1.default, churchcharge_1.churchchargedelete);
exports.default = router;

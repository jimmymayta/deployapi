"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberexpense_1 = require("../../controllers/memberexpense/memberexpense");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, memberexpense_1.memberexpense);
router.post("/create", token_1.default, memberexpense_1.memberexpensecreate);
router.post("/update/:code", token_1.default, memberexpense_1.memberexpenseupdate);
router.get("/delete/:code", token_1.default, memberexpense_1.memberexpensedelete);
exports.default = router;

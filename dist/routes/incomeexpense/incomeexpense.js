"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const incomeexpense_1 = require("../../controllers/incomeexpense/incomeexpense");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, incomeexpense_1.incomeexpense);
router.post("/create", token_1.default, incomeexpense_1.incomeexpensecreate);
router.post("/update/:code", token_1.default, incomeexpense_1.incomeexpenseupdate);
router.get("/delete/:code", token_1.default, incomeexpense_1.incomeexpensedelete);
exports.default = router;

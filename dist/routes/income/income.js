"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const income_1 = require("../../controllers/income/income");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, income_1.income);
router.post("/", token_1.default, income_1.income);
exports.default = router;
//# sourceMappingURL=income.js.map
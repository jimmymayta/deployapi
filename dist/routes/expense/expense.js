"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expense_1 = require("../../controllers/expense/expense");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, expense_1.expense);
router.post("/create", token_1.default, expense_1.expensecreate);
router.post("/update/:code", token_1.default, expense_1.expenseupdate);
router.get("/delete/:code", token_1.default, expense_1.expensedelete);
exports.default = router;

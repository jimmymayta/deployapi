"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const churchactivity_1 = require("../../controllers/churchactivity/churchactivity");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, churchactivity_1.churchactivity);
router.post("/create", token_1.default, churchactivity_1.churchactivitycreate);
router.post("/update/:code", token_1.default, churchactivity_1.churchactivityupdate);
router.get("/delete/:code", token_1.default, churchactivity_1.churchactivitydelete);
exports.default = router;

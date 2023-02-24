"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = require("../../controllers/main/main");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const accessmiddleware_1 = require("../../middlewares/access/accessmiddleware");
const router = (0, express_1.Router)();
router.get("/", [token_1.default, accessmiddleware_1.accessmiddleware], main_1.main);
router.post("/create", [token_1.default, accessmiddleware_1.accessmiddleware], main_1.maincreate);
exports.default = router;

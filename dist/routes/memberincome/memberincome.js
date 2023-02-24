"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberincome_1 = require("../../controllers/memberincome/memberincome");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, memberincome_1.memberincome);
router.post("/create", token_1.default, memberincome_1.memberincomecreate);
router.post("/update/:code", token_1.default, memberincome_1.memberincomeupdate);
router.get("/delete/:code", token_1.default, memberincome_1.memberincomedelete);
exports.default = router;

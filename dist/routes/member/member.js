"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_1 = require("../../controllers/member/member");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const membermiddleware_1 = require("../../middlewares/member/membermiddleware");
const router = (0, express_1.Router)();
router.get("/", [token_1.default], member_1.member);
router.post("/create", [token_1.default, membermiddleware_1.memberidentitycard, membermiddleware_1.memberemail], member_1.membercreate);
router.post("/update/:code", [token_1.default], member_1.memberupdate);
router.get("/delete/:code", [token_1.default], member_1.memberdelete);
router.get("/generatepdf/:code", [token_1.default], member_1.membergeneratepdf);
router.get("/generatecredential/:code", [token_1.default], member_1.membergeneratecredential);
exports.default = router;

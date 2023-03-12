"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberaccess_1 = require("../../controllers/memberaccess/memberaccess");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/:code", token_1.default, memberaccess_1.memberaccess);
router.post("/update/:code", token_1.default, memberaccess_1.memberaccessupdate);
router.get("/delete/:code", token_1.default, memberaccess_1.memberaccessdelete);
exports.default = router;

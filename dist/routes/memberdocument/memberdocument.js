"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberdocument_1 = require("../../controllers/memberdocument/memberdocument");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, memberdocument_1.memberdocument);
router.post("/create", [token_1.default], memberdocument_1.memberdocumentcreate);
router.post("/update/:code", [token_1.default], memberdocument_1.memberdocumentupdate);
router.get("/delete/:code", [token_1.default], memberdocument_1.memberdocumentdelete);
exports.default = router;

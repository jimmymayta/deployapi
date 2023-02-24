"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const membermap_1 = require("../../controllers/membermap/membermap");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, membermap_1.membermap);
router.post("/create", [token_1.default], membermap_1.membermapcreate);
router.post("/update/:code", [token_1.default], membermap_1.membermapupdate);
router.get("/delete/:code", [token_1.default], membermap_1.membermapdelete);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const churchmap_1 = require("../../controllers/churchmap/churchmap");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, churchmap_1.churchmap);
router.post("/create", token_1.default, churchmap_1.churchmapcreate);
router.post("/update/:code", token_1.default, churchmap_1.churchmapupdate);
router.get("/delete/:code", token_1.default, churchmap_1.churchmapdelete);
exports.default = router;

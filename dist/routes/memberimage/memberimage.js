"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberimage_1 = require("../../controllers/memberimage/memberimage");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, memberimage_1.memberimage);
router.post("/create", [token_1.default], memberimage_1.memberimagecreate);
router.post("/update/:code", [token_1.default], memberimage_1.memberimageupdate);
router.get("/delete/:code", [token_1.default], memberimage_1.memberimagedelete);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainimage_1 = require("../../controllers/mainimage/mainimage");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const principal_1 = __importDefault(require("../../middlewares/principal/principal"));
const router = (0, express_1.Router)();
router.get("/", [principal_1.default], mainimage_1.mainimage);
router.post("/create", [token_1.default], mainimage_1.mainimagecreate);
router.post("/update/:code", [token_1.default], mainimage_1.mainimageupdate);
router.get("/delete/:code", [token_1.default], mainimage_1.mainimagedelete);
exports.default = router;

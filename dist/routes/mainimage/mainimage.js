"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainimage_1 = require("../../controllers/mainimage/mainimage");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, mainimage_1.mainimage);
router.post("/create", [token_1.default], mainimage_1.mainimagecreate);
router.post("/update/:code", [token_1.default], mainimage_1.mainimageupdate);
router.post("/delete/:code", [token_1.default], mainimage_1.mainimagedelete);
exports.default = router;
//# sourceMappingURL=mainimage.js.map
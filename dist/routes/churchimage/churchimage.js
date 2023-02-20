"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const churchimage_1 = require("../../controllers/churchimage/churchimage");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, churchimage_1.churchimage);
router.post("/create", token_1.default, churchimage_1.churchimagecreate);
router.post("/update/:code", token_1.default, churchimage_1.churchimageupdate);
router.get("/delete/:code", token_1.default, churchimage_1.churchimagedelete);
exports.default = router;
//# sourceMappingURL=churchimage.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const advertising_1 = require("../../controllers/advertising/advertising");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, advertising_1.advertising);
router.post("/create", token_1.default, advertising_1.advertisingcreate);
router.post("/update/:code", token_1.default, advertising_1.advertisingupdate);
router.get("/delete/:code", token_1.default, advertising_1.advertisingdelete);
exports.default = router;
//# sourceMappingURL=advertising.js.map
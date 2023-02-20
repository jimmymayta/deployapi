"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const districtcharge_1 = require("../../controllers/districtcharge/districtcharge");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, districtcharge_1.districtcharge);
router.post("/create", token_1.default, districtcharge_1.districtchargecreate);
router.post("/update/:code", token_1.default, districtcharge_1.districtchargeupdate);
router.get("/delete/:code", token_1.default, districtcharge_1.districtchargedelete);
exports.default = router;
//# sourceMappingURL=districtcharge.js.map
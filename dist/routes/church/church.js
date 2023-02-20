"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const church_1 = require("../../controllers/church/church");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, church_1.church);
router.post("/create", token_1.default, church_1.churchcreate);
router.post("/update/:code", token_1.default, church_1.churchupdate);
router.get("/delete/:code", token_1.default, church_1.churchdelete);
exports.default = router;
//# sourceMappingURL=church.js.map
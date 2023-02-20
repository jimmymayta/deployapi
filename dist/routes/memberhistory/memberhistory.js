"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberhistory_1 = require("../../controllers/memberhistory/memberhistory");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, memberhistory_1.memberhistory);
router.post("/create", [token_1.default], memberhistory_1.memberhistorycreate);
router.post("/update/:code", [token_1.default], memberhistory_1.memberhistoryupdate);
router.get("/delete/:code", [token_1.default], memberhistory_1.memberhistorydelete);
exports.default = router;
//# sourceMappingURL=memberhistory.js.map
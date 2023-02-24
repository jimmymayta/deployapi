"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberexpensedata_1 = require("../../controllers/memberexpensedata/memberexpensedata");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, memberexpensedata_1.memberexpensedata);
router.post("/create", token_1.default, memberexpensedata_1.memberexpensedatacreate);
router.post("/update/:code", token_1.default, memberexpensedata_1.memberexpensedataupdate);
router.get("/delete/:code", token_1.default, memberexpensedata_1.memberexpensedatadelete);
exports.default = router;

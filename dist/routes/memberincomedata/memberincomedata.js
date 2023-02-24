"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberincomedata_1 = require("../../controllers/memberincomedata/memberincomedata");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, memberincomedata_1.memberincomedata);
router.post("/create", token_1.default, memberincomedata_1.memberincomedatacreate);
router.post("/update/:code", token_1.default, memberincomedata_1.memberincomedataupdate);
router.get("/delete/:code", token_1.default, memberincomedata_1.memberincomedatadelete);
exports.default = router;

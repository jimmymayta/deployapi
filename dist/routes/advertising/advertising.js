"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const advertising_1 = require("../../controllers/advertising/advertising");
const principal_1 = __importDefault(require("../../middlewares/principal/principal"));
const router = (0, express_1.Router)();
router.get("/", principal_1.default, advertising_1.advertising);
router.post("/create", principal_1.default, advertising_1.advertisingcreate);
router.post("/update/:code", principal_1.default, advertising_1.advertisingupdate);
router.get("/delete/:code", principal_1.default, advertising_1.advertisingdelete);
exports.default = router;

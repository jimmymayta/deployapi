"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const churchministry_1 = require("../../controllers/churchministry/churchministry");
const token_1 = __importDefault(require("../../middlewares/token/token"));
const router = (0, express_1.Router)();
router.get("/", token_1.default, churchministry_1.churchministry);
router.post("/create", token_1.default, churchministry_1.churchministrycreate);
router.post("/update/:code", token_1.default, churchministry_1.churchministryupdate);
router.get("/delete/:code", token_1.default, churchministry_1.churchministrydelete);
exports.default = router;

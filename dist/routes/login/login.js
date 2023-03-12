"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("../../controllers/login/login");
const router = (0, express_1.Router)();
router.post("/", login_1.login);
router.post("/verify", login_1.loginverify);
exports.default = router;

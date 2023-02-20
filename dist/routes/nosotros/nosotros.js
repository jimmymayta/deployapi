"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nosotros_1 = require("../../controllers/nosotros/nosotros");
const router = (0, express_1.Router)();
router.get("/", nosotros_1.nosotros);
exports.default = router;
//# sourceMappingURL=nosotros.js.map
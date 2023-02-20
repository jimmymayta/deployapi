"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../../controllers/admin/admin");
const router = (0, express_1.Router)();
router.get("/:code", admin_1.admin);
exports.default = router;
//# sourceMappingURL=admin.js.map
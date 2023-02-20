"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const principal_1 = require("../../controllers/principal/principal");
const router = (0, express_1.Router)();
router.get("/main", principal_1.principalhome);
router.get("/church", principal_1.principalchurch);
router.get("/nosotros", principal_1.principalnosotros);
router.get("/contact", principal_1.principalcontact);
router.get("/info", principal_1.principalinfo);
exports.default = router;
//# sourceMappingURL=principal.js.map
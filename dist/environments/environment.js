"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    apiname: "api",
    apiversion: "3.2.1",
    apiport: Number(process.env.PORT) || 3000,
    apiproduction: true,
    database: "consejoministerialdatabase",
    mongodbdev: "mongodb://127.0.0.1:27017",
    mongodbpro: "mongodb+srv://iebsnal:xRSih9Jaxiumkvxd@cluster0.vv4yue2.mongodb.net",
    urlapidev: "http://localhost",
    urlapipro: "https://api-consejo-ministerial.onrender.com",
    urlappdev: [
        "http://localhost:5173",
        "http://localhost:4173",
        "http://127.0.0.1:5500",
        "http://localhost",
    ],
    urlapppro: [
        "https://fds-cqeo.onrender.com",
        "https://jimmymayta.github.io/iebs",
        "app.android.com/api-123",
        "https://iebs.000webhostapp.com"
    ],
    keysecret: "Y72YEATpY2ucABDsZ6vgtwrBv7yG2k",
};
//# sourceMappingURL=environment.js.map
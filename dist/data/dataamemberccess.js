"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accesslevel = exports.accessname = void 0;
const accessname = [
    { number: 1, name: "principalmain" },
    { number: 2, name: "principalnosotros" },
    { number: 3, name: "principalcontact" },
    { number: 4, name: "member" },
    { number: 5, name: "church" },
    { number: 6, name: "district" },
    { number: 7, name: "national" },
    { number: 8, name: "report" },
    { number: 9, name: "reportactivity" },
    { number: 10, name: "income" },
    { number: 11, name: "expense" },
];
exports.accessname = accessname;
const accesslevel = [
    { number: 1, level: "personal" },
    { number: 2, level: "church" },
    { number: 3, level: "district" },
    { number: 4, level: "national" },
];
exports.accesslevel = accesslevel;

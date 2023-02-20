"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randominteger = exports.randomstring = void 0;
const chance_1 = __importDefault(require("chance"));
const chance = new chance_1.default();
const randomstring = () => {
    return chance.string({ length: 8, pool: "abcde" });
};
exports.randomstring = randomstring;
const randominteger = () => {
    return chance.string({ length: 8, pool: "123456789" });
};
exports.randominteger = randominteger;
//# sourceMappingURL=random.js.map
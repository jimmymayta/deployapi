"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.membermember = void 0;
const member_1 = __importDefault(require("../../models/member"));
const membermember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberresult = yield member_1.default.aggregate([
        {
            $match: { membercode: req.code },
        },
        {
            $project: {
                membercode: 1,
                names: 1,
                firstlastname: 1,
                secondlastname: 1,
            },
        },
        {
            $lookup: {
                from: "memberaccess",
                localField: "_id",
                foreignField: "idmember",
                as: "memberaccess",
                pipeline: [{ $project: { memberaccessname: 1, iduser: 1 } }],
            },
        },
    ]);
    console.log(memberresult[0].memberaccess);
    return res.json({
        member: memberresult,
    });
});
exports.membermember = membermember;
const membercreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const respuesta = req.body;
});
//# sourceMappingURL=membermember.js.map
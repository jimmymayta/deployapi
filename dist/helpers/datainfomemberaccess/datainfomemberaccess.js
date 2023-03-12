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
exports.datainfomemberaccess = void 0;
const member_1 = __importDefault(require("../../models/member"));
const datainfomemberaccess = (code, infoaccess) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ code, infoaccess });
    let membersession = false;
    const memberresult = yield member_1.default.aggregate([
        {
            $match: { membercode: code },
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
                pipeline: [
                    {
                        $match: {
                            state: "activated",
                        },
                    },
                    {
                        $project: {
                            memberaccessname: 1,
                            memberaccesscreate: 1,
                            memberaccessupdate: 1,
                            memberaccessdelete: 1,
                            memberaccesslevelname: 1,
                        },
                    },
                ],
            },
        },
    ]);
    if (!(memberresult.length > 0)) {
        return {
            membercode: code,
            member: "",
            access: [
                "principalmain",
                "principalchurch",
                "principalnosotros",
                "principalcontact",
                "principalinfo"
            ],
            create: false,
            update: false,
            delete: false,
            session: false,
        };
    }
    membersession = true;
    let member = memberresult[0];
    const { memberaccesscreate, memberaccessupdate, memberaccessdelete, memberaccesslevelname, } = member.memberaccess.find((e) => e.memberaccessname === infoaccess);
    return {
        code: member.membercode,
        member: `${member.names} ${member.firstlastname} ${member.secondlastname}`,
        access: member.memberaccess.map((e) => e.memberaccessname),
        create: memberaccesscreate,
        update: memberaccessupdate,
        delete: memberaccessdelete,
        level: memberaccesslevelname,
        session: membersession,
    };
});
exports.datainfomemberaccess = datainfomemberaccess;

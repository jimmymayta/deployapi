"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MemberDocumentSchema = new mongoose_1.Schema({
    memberdocumentcode: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        default: null,
        required: [true, "Member Document Code"],
    },
    memberdocumentnumber: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [true, "Member Document Number"],
    },
    memberdocumentname: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Member Document Name"],
    },
    memberdocumentfile: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Member Document File"],
    },
    memberdocumentextension: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Member Document Extension"],
    },
    memberdocumentdate: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Member Document Date"],
    },
    idmember: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Member",
        lowercase: false,
        trim: false,
        unique: false,
        default: null,
        required: [false, "ID Member"],
    },
    membermember: {
        type: mongoose_1.Schema.Types.ObjectId,
        lowercase: false,
        trim: false,
        unique: false,
        default: null,
        required: [false, "Member Member"],
    },
    state: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: "activated",
        emun: ["activated", "deactivated", "deleted"],
        required: [false, "State"],
    },
    comment: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Comment"],
    },
    description: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Description"],
    },
    detail: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Detail"],
    },
    datecreate: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Date Create"],
    },
    dateupdate: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Date Update"],
    },
    datedelete: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Date Delete"],
    },
}, { collection: "memberdocument" });
exports.default = (0, mongoose_1.model)("MemberDocument", MemberDocumentSchema);
//# sourceMappingURL=memberdocument.js.map
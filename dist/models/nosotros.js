"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NosotrosSchema = new mongoose_1.Schema({
    nosotroscode: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        default: null,
        required: [true, "Nosotros Code"],
    },
    nosotrosnumber: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        default: null,
        required: [true, "Nosotros Number"],
    },
    nosotrosname: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        default: null,
        required: [true, "Nosotros Name"],
    },
    nosotrosdata: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Nosotros Data"],
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
}, { collection: "nosotros" });
exports.default = (0, mongoose_1.model)("Nosotros", NosotrosSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    user: {
        type: String,
        lowercase: false,
        trim: false,
        unique: true,
        default: null,
        required: [true, "User"],
    },
    password: {
        type: String,
        lowercase: false,
        trim: false,
        unique: true,
        default: null,
        required: [true, "User"],
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
}, { collection: "user" });
exports.default = (0, mongoose_1.model)("User", UserSchema);

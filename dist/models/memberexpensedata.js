"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MemberExpenseDataSchema = new mongoose_1.Schema({
    memberexpensedatacode: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        default: null,
        required: [true, "Member Expense Data Code"],
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
    idexpense: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Expense",
        lowercase: false,
        trim: false,
        unique: false,
        default: null,
        required: [false, "ID Expense"],
    },
    idmemberexpense: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "MemberExpense",
        lowercase: false,
        trim: false,
        unique: false,
        default: null,
        required: [false, "ID Member Expense"],
    },
    amount: {
        type: String,
        lowercase: false,
        trim: false,
        unique: false,
        default: null,
        required: [true, "Amount"],
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
}, { collection: "memberexpensedata" });
exports.default = (0, mongoose_1.model)("MemberExpenseData", MemberExpenseDataSchema);

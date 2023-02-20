"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChurchActivitySchema = new mongoose_1.Schema({
    churchactivitycode: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        default: null,
        required: [true, "Church Activity Code"],
    },
    churchactivityname: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Church Activity Name"],
    },
    churchactivitydescription: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Church Activity Description"],
    },
    churchactivityimagename: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Church Activity Image Name"],
    },
    churchactivityimagefile: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Church Activity Image File"],
    },
    churchactivityimagewidth: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Church Activity Image Width"],
    },
    churchactivityimageheight: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Church Activity Image Height"],
    },
    churchactivityimageextension: {
        type: String,
        lowercase: true,
        trim: true,
        unique: false,
        default: null,
        required: [false, "Church Activity Image Extension"],
    },
    idchurch: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Church",
        lowercase: false,
        trim: false,
        unique: false,
        default: null,
        required: [false, "ID Church"],
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
}, { collection: "churchactivity" });
exports.default = (0, mongoose_1.model)("ChurchActivity", ChurchActivitySchema);
//# sourceMappingURL=churchactivity.js.map
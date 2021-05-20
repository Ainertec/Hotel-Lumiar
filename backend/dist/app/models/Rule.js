"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const mongoose_1 = require("mongoose");
const RuleSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true,
    },
    atention: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.model('Rule', RuleSchema);

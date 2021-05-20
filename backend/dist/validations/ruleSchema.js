"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
const celebrate_1 = require("celebrate");
exports.rule = celebrate_1.Joi.object().keys({
    description: celebrate_1.Joi.string().required(),
    atention: celebrate_1.Joi.boolean(),
});

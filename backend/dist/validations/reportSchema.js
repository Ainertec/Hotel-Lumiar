"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.report = void 0;
const celebrate_1 = require("celebrate");
exports.report = celebrate_1.Joi.object().keys({
    initial: celebrate_1.Joi.string().required(),
    final: celebrate_1.Joi.string().required(),
});

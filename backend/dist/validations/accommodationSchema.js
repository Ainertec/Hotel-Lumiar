"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const accommodation = celebrate_1.Joi.object().keys({
    checkin: celebrate_1.Joi.string().required(),
    checkout: celebrate_1.Joi.string().required(),
    fourth: celebrate_1.Joi.string().required(),
    price: celebrate_1.Joi.number().required(),
});
exports.default = accommodation;

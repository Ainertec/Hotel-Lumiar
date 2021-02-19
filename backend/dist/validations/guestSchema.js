"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const validObjectId_1 = __importDefault(require("./validObjectId"));
const accommodation = celebrate_1.Joi.custom(validObjectId_1.default, 'valid id');
const address = {
    district: celebrate_1.Joi.string().required(),
    city: celebrate_1.Joi.string().required(),
    street: celebrate_1.Joi.string().required(),
    cep: celebrate_1.Joi.string().required()
};
const car = {
    model: celebrate_1.Joi.string().required(),
    plate: celebrate_1.Joi.string().required()
};
const guest = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string().required(),
    address: celebrate_1.Joi.object().keys(address).required(),
    phone: celebrate_1.Joi.string().required(),
    identification: celebrate_1.Joi.string().required(),
    note: celebrate_1.Joi.string().required(),
    email: celebrate_1.Joi.string().required(),
    dateBirth: celebrate_1.Joi.string().required(),
    car: celebrate_1.Joi.object().keys(car).required(),
    escort: celebrate_1.Joi.string().required(),
    accommodations: celebrate_1.Joi.array().items(accommodation).required(),
});
exports.default = guest;

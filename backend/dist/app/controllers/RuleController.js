"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = __importDefault(require("../models/Rule"));
class RuleController {
    async index(request, response) {
        const rules = await Rule_1.default.find({});
        return response.json(rules);
    }
    async store(request, response) {
        const { description, atention } = request.body;
        const rule = await Rule_1.default.create({
            description,
            atention
        });
        return response.json(rule);
    }
    async update(request, response) {
        const { description, atention } = request.body;
        const { id } = request.params;
        const rule = await Rule_1.default.findOneAndUpdate({ _id: id }, {
            description,
            atention
        }, { new: true });
        return response.json(rule);
    }
    async delete(request, response) {
        const { id } = request.params;
        await Rule_1.default.findOneAndRemove({ _id: id });
        return response.status(200).send();
    }
}
exports.default = new RuleController();

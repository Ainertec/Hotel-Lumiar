"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Accommodation_1 = __importDefault(require("../models/Accommodation"));
class AccommodationController {
    async store(request, response) {
        const { checkin, checkout, fourth, price } = request.body;
        const accommodation = await Accommodation_1.default.create({
            checkin,
            checkout,
            fourth,
            price
        });
        return response.json(accommodation);
    }
    async update(request, response) {
        const { checkin, checkout, fourth, price } = request.body;
        const { id } = request.params;
        const accommodation = await Accommodation_1.default.findOneAndUpdate({ _id: id }, {
            checkin,
            checkout,
            fourth,
            price
        }, { new: true });
        return response.json(accommodation);
    }
    async delete(request, response) {
        const { id } = request.params;
        await Accommodation_1.default.findOneAndRemove({ _id: id });
        return response.status(200).send();
    }
}
exports.default = new AccommodationController();

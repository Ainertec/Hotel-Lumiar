"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Guest_1 = __importDefault(require("../models/Guest"));
class GuestController {
    constructor() {
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
    }
    async index(request, response) {
        const guests = await Guest_1.default.find({}).populate('accommodations.reference');
        return response.json(guests);
    }
    async show(request, response) {
        const { name } = request.params;
        const guests = await Guest_1.default.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        }).populate('accommodations.reference');
        return response.json(guests);
    }
    async store(request, response) {
        const { name, address, phone, identification, note, email, dateBirth, car, escort, accommodations } = request.body;
        const guest = await Guest_1.default.create({
            name,
            address,
            phone,
            identification,
            note,
            email,
            dateBirth,
            car,
            escort,
            accommodations,
        });
        await guest.populate('accommodations.reference').execPopulate();
        return response.json(guest);
    }
    async update(request, response) {
        const { name, address, phone, identification, note, email, dateBirth, car, escort, accommodations } = request.body;
        const { id } = request.params;
        const guest = await Guest_1.default.findOneAndUpdate({ _id: id }, {
            name,
            address,
            phone,
            identification,
            note,
            email,
            dateBirth,
            car,
            escort,
            accommodations,
        }, { new: true });
        if (!guest)
            return response.status(400).json('guest not found');
        await guest.save();
        await guest.populate('accommodations.reference').execPopulate();
        return response.json(guest);
    }
    async delete(request, response) {
        const { id } = request.params;
        await Guest_1.default.deleteOne({ _id: id });
        return response.status(200).send();
    }
}
exports.default = new GuestController();

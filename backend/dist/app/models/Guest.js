"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Accommodation_1 = __importDefault(require("./Accommodation"));
const AddressSchema = new mongoose_1.Schema({
    district: {
        type: String,
        default: null,
    },
    city: {
        type: String,
        default: null,
    },
    street: {
        type: String,
        default: null,
    },
    cep: {
        type: String,
        default: null,
    },
});
const CarSchema = new mongoose_1.Schema({
    model: {
        type: String,
        default: null,
    },
    plate: {
        type: String,
        default: null,
    },
});
const GuestSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: null,
    },
    identification: {
        type: String,
        default: null,
    },
    note: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
    },
    dateBirth: {
        type: String,
        default: null,
    },
    escort: {
        type: String,
        default: null,
    },
    car: CarSchema,
    address: AddressSchema,
    accommodations: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Accommodation',
            required: true
        }
    ],
}, {
    timestamps: true,
});
GuestSchema.post('findOneAndDelete', async (document) => {
    if (document) {
        const accommodationID = document.accommodations;
        for (const accommodation of accommodationID) {
            await Accommodation_1.default.deleteOne({ _id: accommodation });
        }
    }
});
exports.default = mongoose_1.model('Guest', GuestSchema);

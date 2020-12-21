"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/*export interface IAddress extends Document {
  district: string;
  street: string;
  reference: string;
  number: number;
};

export interface IUser {
  name: string;
  username: string;
  password: string;
  question: string;
  response: string;
  address?: IAddress[];
  phone: string[];
};*/
const AccommodationSchema = new mongoose_1.Schema({
    reference: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Accommodation',
        required: true,
    }
});
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
    accommodations: [AccommodationSchema],
}, {
    timestamps: true,
});
exports.default = mongoose_1.model('Guest', GuestSchema);

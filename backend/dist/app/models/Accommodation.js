"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const mongoose_1 = require("mongoose");
const Guest_1 = __importDefault(require("./Guest"));
const AccommodationSchema = new mongoose_1.Schema({
    checkin: {
        type: String,
        required: true,
    },
    checkout: {
        type: String,
        required: true,
    },
    fourth: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
AccommodationSchema.post('findOneAndRemove', (document) => {
    if (document) {
        const accommodationId = document._id;
        Guest_1.default.find({ accommodations: { $in: [accommodationId] } }).then((guests) => {
            Promise.all(guests.map((guest) => Guest_1.default.findOneAndUpdate({ _id: guest._id }, { $pull: { accommodations: accommodationId } }, { new: true })));
        });
    }
});
/*AccommodationSchema.post<AccommodationInterface>(
  'findOneAndUpdate',
  async document => {
    if (document) {
      const accommodationID = document._id;

      const guests = await Guest.find({
        'accommodation.reference': { $in: accommodationID },
      });
      await Promise.all(
        guests.map(async (guest: AccommodationInterface) => {
          await guest.save();
        }),
      );
    }
  },
);*/
/*AccommodationSchema.post<AccommodationInterface>(
  'findOneAndRemove',
  async document => {
    if (document) {
      const accommodationID = document._id;
      const guests = await Guest.find({
        'accommodations.reference': { $in: accommodationID },
      });
      await Promise.all(
        guests.map(async (guest: GuestInterface) => {
          const accommodationUpdated = guest.accommodations.filter(
            accommodation => String(accommodation.reference) !== String(accommodationID),
          );
          guest.accommodations = accommodationUpdated;
          await guest.save();
        }),
      );
    }
  },
);*/
exports.default = mongoose_1.model('Accommodation', AccommodationSchema);

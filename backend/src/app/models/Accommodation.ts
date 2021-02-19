/* eslint-disable no-param-reassign */
import { Schema, model } from 'mongoose';
import { AccommodationInterface, GuestInterface } from '../../interfaces/base';
import Guest from './Guest';

const AccommodationSchema = new Schema<AccommodationInterface>(
  {
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
  },
  {
    timestamps: true,
  },
);

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

export default model<AccommodationInterface>('Accommodation', AccommodationSchema);

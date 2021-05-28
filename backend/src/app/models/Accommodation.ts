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

AccommodationSchema.post('findOneAndRemove', (document) => {
  if (document) {
    const accommodationId = document._id;
    Guest.find({ accommodations: { $in: [accommodationId] } }).then((guests) => {
      Promise.all(
        guests.map((guest) =>
          Guest.findOneAndUpdate(
            { _id: guest._id },
            { $pull: { accommodations: accommodationId } },
            { new: true }
          )
        )
      );
    });
  }
});

export default model<AccommodationInterface>('Accommodation', AccommodationSchema);

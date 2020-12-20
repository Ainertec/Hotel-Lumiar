import { Schema, model } from 'mongoose';
import { GuestInterface } from '../../interfaces/base';

const AccommodationSchema = new Schema({
  reference: {
    type: Schema.Types.ObjectId,
    ref: 'Accommodation',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const GuestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    available: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      required: true,
    },

    accommodations: [AccommodationSchema],
  },
  {
    timestamps: true,
  },
);

export default model<GuestInterface>('Guest', GuestSchema);

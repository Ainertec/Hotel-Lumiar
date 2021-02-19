import { Schema, model } from 'mongoose';
import { GuestInterface } from '../../interfaces/base';
import Accommodation from './Accommodation';

const AddressSchema = new Schema({
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

const CarSchema = new Schema({
  model: {
    type: String,
    default: null,
  },
  plate: {
    type: String,
    default: null,
  },
});

const GuestSchema = new Schema(
  {
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
      type: Schema.Types.ObjectId,
      ref: 'Accommodation',
      required: true
      }
    ],
  },
  {
    timestamps: true,
  },
);


GuestSchema.post<GuestInterface>(
  'findOneAndDelete',
  async document => {
    if (document) {
      const accommodationID = document.accommodations;

      for (const accommodation of accommodationID) {
        await Accommodation.deleteOne({_id: accommodation});
      } 
    }
  })

export default model<GuestInterface>('Guest', GuestSchema);

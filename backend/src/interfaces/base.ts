/* eslint-disable camelcase */
import { Document, Types } from 'mongoose';

export interface GuestInterface extends Document {
  name: string;
  address: Address;
  phone: string;
  identification: String;
  note: string;
  email: string;
  dateBirth: string;
  car: Car;
  escort: string;
  accommodations: Accommodation[];
}
export interface Address {
  district: string;
  city: string;
  street: string;
  cep: string;
}
export interface Car {
  model: string;
  plate: string;
}
export interface Accommodation {
  reference: AccommodationInterface;
}
export interface AccommodationInterface extends Document {
  checkin: string;
  checkout: string;
  fourth: string;
  price: number;
}
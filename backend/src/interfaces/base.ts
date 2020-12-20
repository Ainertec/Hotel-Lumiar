/* eslint-disable camelcase */
import { Document, Types } from 'mongoose';

export interface GuestInterface extends Document {
  name: string;
  price: number;
  available?: boolean;
  description?: string;
  accommodations: Accommodation[];
  image: string;
}
export interface Accommodation {
  reference: AccommodationInterface;
  quantity: number;
}
export interface Items {
  guest: GuestInterface;
  quantity: number;
}
export interface AccommodationInterface extends Document {
  name: string;
  price: number;
  priceUnit: number;
  description?: string;
  stock: number;
}
export interface ItemsInterface extends Document {
  guest: GuestInterface;
  quantity: number;
}
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import accommodation from '../../validations/accommodationSchema';
import Guest from '../models/Guest';

class GuestController {
  public constructor() {
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
  }

  async index(request: Request, response: Response) {
    const guests = await Guest.find({}).populate('accommodations');
    return response.json(guests);
  }

  async show(request: Request, response: Response) {
    const { name } = request.params;

    const guests = await Guest.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    }).populate('accommodations')

    return response.json(guests);
  }

  async store(request: Request, response: Response) {
    const { name, address, phone, identification, note, email, dateBirth, car, escort, accommodations } = request.body;
    const guest = await Guest.create({
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
    await guest.populate('accommodations').execPopulate();
    return response.json(guest);
  }

  async update(request: Request, response: Response) {
    const { name, address, phone, identification, note, email, dateBirth, car, escort, accommodations } = request.body;
    const { id } = request.params;

    const guest = await Guest.findOneAndUpdate(
      { _id: id },
      {
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
      },
      { new: true },
    );
    if (!guest) return response.status(400).json('guest not found');

    await guest.save();

    await guest.populate('accommodations').execPopulate();

    return response.json(guest);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await Guest.findOneAndDelete({ _id: id });

    return response.status(200).send();
  }
}

export default new GuestController();

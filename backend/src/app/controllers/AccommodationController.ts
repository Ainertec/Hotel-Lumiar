/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import Accommodation from '../models/Accommodation';

class AccommodationController {
  async index(request: Request, response: Response) {
    const accommodations = await Accommodation.find({});
    return response.json(accommodations);
  }

  async show(request: Request, response: Response) {
    const { name } = request.params;
    const accommodations = await Accommodation.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    });

    return response.json(accommodations);
  }

  async store(request: Request, response: Response) {
    const { name, description, price, stock } = request.body;

    const priceUnit = price / stock;

    const accommodation = await Accommodation.create({
      name,
      description,
      price,
      priceUnit,
      stock,
    });

    return response.json(accommodation);
  }

  async update(request: Request, response: Response) {
    const { name, description, price, stock } = request.body;
    const { id } = request.params;
    const priceUnit = price / stock;

    const accommodation = await Accommodation.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        price,
        priceUnit,
        stock,
      },
      { new: true },
    );

    return response.json(accommodation);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await Accommodation.findOneAndRemove({ _id: id });

    return response.status(200).send();
  }
}

export default new AccommodationController();

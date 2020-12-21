/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import Accommodation from '../models/Accommodation';

class AccommodationController {

  async store(request: Request, response: Response) {
    const { checkin, checkout, fourth, price } = request.body;

    const accommodation = await Accommodation.create({
      checkin,
      checkout,
      fourth,
      price
    });

    return response.json(accommodation);
  }

  async update(request: Request, response: Response) {
    const { checkin, checkout, fourth, price } = request.body;
    const { id } = request.params;

    const accommodation = await Accommodation.findOneAndUpdate(
      { _id: id },
      {
        checkin,
        checkout,
        fourth,
        price
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

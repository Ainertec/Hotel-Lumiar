import { Router } from 'express';
import { celebrate } from 'celebrate';
import AccommodationController from '../app/controllers/AccommodationController';
import { IValidationsAccommodation } from './routesDTO';

export class AccommodationRoutes {
  constructor(private routes: Router) { }

  getRoutes(validations: IValidationsAccommodation) {
    this.routes.post(
      '/accommodations',
      celebrate({ body: validations.accommodation }),
      AccommodationController.store,
    );
    this.routes.put(
      '/accommodations/:id',
      celebrate({ body: validations.accommodation, params: validations.paramId }),
      AccommodationController.update,
    );
    this.routes.delete(
      '/accommodations/:id',
      celebrate({ params: validations.paramId }),
      AccommodationController.delete,
    );
  }
}

import { Router } from 'express';
import { celebrate } from 'celebrate';
import GuestController from '../app/controllers/GuestController';
import { IValidationsGuest } from './routesDTO';

export class GuestRoutes {
  constructor(private routes: Router) { }

  getRoutes(validations: IValidationsGuest) {
    this.routes.get('/guests', GuestController.index);
    this.routes.get(
      '/guests/:name',
      celebrate({ params: validations.paramName }),
      GuestController.show,
    );
    this.routes.post(
      '/guests',
      celebrate({ body: validations.guest }),
      GuestController.store,
    );
    this.routes.put(
      '/guests/:id',
      celebrate({ body: validations.guest, params: validations.paramId }),
      GuestController.update,
    );
    this.routes.delete(
      '/guests/:id',
      celebrate({ params: validations.paramId }),
      GuestController.delete,
    );
  }
}

import { Router } from 'express';
import { celebrate } from 'celebrate';
import GuestController from '../app/controllers/GuestController';
import { IValidationsGuest } from './routesDTO';
import Authorization from '../middlewares/Authorization';
import Authentication from '../middlewares/Authentication';

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
      Authentication,
      Authorization,
      celebrate({ body: validations.guest }),
      GuestController.store,
    );
    this.routes.put(
      '/guests/:id',
      Authentication,
      Authorization,
      celebrate({ body: validations.guest, params: validations.paramId }),
      GuestController.update,
    );
    this.routes.delete(
      '/guests/:id',
      Authentication,
      Authorization,
      celebrate({ params: validations.paramId }),
      GuestController.delete,
    );
  }
}

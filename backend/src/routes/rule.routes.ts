import { Router } from 'express';
import { celebrate } from 'celebrate';
import RuleController from '../app/controllers/RuleController';
import { IValidationsRule } from './routesDTO';

export class RuleRoutes {
  constructor(private routes: Router) { }

  getRoutes(validations: IValidationsRule) {
    this.routes.get('/rules', RuleController.index);
    this.routes.post(
      '/rules',
      celebrate({ body: validations.rule }),
      RuleController.store,
    );
    this.routes.put(
      '/rules/:id',
      celebrate({ body: validations.rule, params: validations.paramId }),
      RuleController.update,
    );
    this.routes.delete(
      '/rules/:id',
      celebrate({ params: validations.paramId }),
      RuleController.delete,
    );
  }
}

import { Router } from 'express';
import { celebrate } from 'celebrate';
import ReportController from '../app/controllers/ReportController';

import { IValidationReport } from './routesDTO';

export class ReportRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationReport) {
    this.routes.get(
      '/reports',
      celebrate({ query: validations.report }),
      ReportController.index,
    );
  }
}

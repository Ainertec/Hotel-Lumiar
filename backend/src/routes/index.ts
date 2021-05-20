import { Router } from 'express';

import { celebrate } from 'celebrate';
import { GuestRoutes } from './guest.routes';
import { AccommodationRoutes } from './accommodations.routes';
import { ReportRoutes } from './resport.routes';
import { RuleRoutes } from './rule.routes';

// validations
import guest from '../validations/guestSchema';
import accommodation from '../validations/accommodationSchema';;
import { paramName, paramId } from '../validations/commonSchema';
import { report } from '../validations/reportSchema';
import { rule } from '../validations/ruleSchema';

const routes = Router();

// guests
const guestRouters = new GuestRoutes(routes);
guestRouters.getRoutes({ guest, paramName, paramId });

// accommodations
const accommodationRoutes = new AccommodationRoutes(routes);
accommodationRoutes.getRoutes({ paramName, paramId, accommodation });

// Report
const reportRoutes = new ReportRoutes(routes);
reportRoutes.getRoutes({
  report,
});

// rutes
const ruleRouters = new RuleRoutes(routes);
ruleRouters.getRoutes({ rule, paramId });

export default routes;

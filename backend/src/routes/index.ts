import { Router } from 'express';

import { celebrate } from 'celebrate';
import { GuestRoutes } from './guest.routes';
import { AccommodationRoutes } from './accommodations.routes';

// validations
import guest from '../validations/guestSchema';
import accommodation from '../validations/accommodationSchema';;
import { paramName, paramId } from '../validations/commonSchema';

const routes = Router();

// guests
const guestRouters = new GuestRoutes(routes);
guestRouters.getRoutes({ guest, paramName, paramId });


// accommodations
const accommodationRoutes = new AccommodationRoutes(routes);
accommodationRoutes.getRoutes({ paramName, paramId, accommodation });

export default routes;

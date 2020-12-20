import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

const accommodation = Joi.object().keys({
  reference: Joi.custom(validObjectId, 'valid id').required(),
});
const guest = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  accommodation: Joi.array().items(accommodation).required(),
  price: Joi.number().required(),
  cost: Joi.number(),
  available: Joi.boolean(),
  image: Joi.string().required(),
});

export default guest;

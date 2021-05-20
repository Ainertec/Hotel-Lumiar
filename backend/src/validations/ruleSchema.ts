import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

export const rule = Joi.object().keys({
  description: Joi.string().required(),
  atention: Joi.boolean(),
});
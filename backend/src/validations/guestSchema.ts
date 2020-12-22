import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

const accommodation = Joi.custom(validObjectId, 'valid id');

const address = {
  district: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  cep: Joi.string().required()
};

const car = {
  model: Joi.string().required(),
  plate: Joi.string().required()
};


const guest = Joi.object().keys({
  name: Joi.string().required(),
  address: Joi.object().keys(address).required(),
  phone: Joi.string().required(),
  identification: Joi.string().required(),
  note: Joi.string().required(),
  email: Joi.string().required(),
  dateBirth: Joi.string().required(),
  car: Joi.object().keys(car).required(),
  escort: Joi.string().required(),
  accommodations: Joi.array().items(accommodation).required(),

  /*accommodation: Joi.array().items(accommodation).required(),*/
});

export default guest;

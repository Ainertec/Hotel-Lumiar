import { Joi } from 'celebrate';

const accommodation = Joi.object().keys({
  checkin: Joi.string().required(),
  checkout: Joi.string().required(),
  fourth: Joi.string().required(),
  price: Joi.number().required(),
});

export default accommodation;

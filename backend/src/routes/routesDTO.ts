/* eslint-disable camelcase */
import Joi from '@hapi/joi';

interface IParamName {
  name: Joi.StringSchema;
}
interface IParamId {
  id: Joi.AnySchema;
}
export interface IValidationsGuest {
  paramName: IParamName;
  guest: Joi.ObjectSchema;
  paramId: IParamId;
}
export interface IValidationsAccommodation {
  paramName: IParamName;
  accommodation: Joi.ObjectSchema;
  paramId: IParamId;
}
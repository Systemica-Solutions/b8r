import Joi from '@hapi/joi';
import { failureResponse } from '../helpers/api-response.helper';
import { staticStatus } from '../constants/global.constants';

// add/edit board schema validation
export const boardValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    tenantId: Joi.string().required(),
    propertyId: Joi.array().items(Joi.string()).optional(),
    status: Joi.string()
      .valid(...Object.keys(staticStatus))
      .optional(),
    key: Joi.string().optional(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return failureResponse(
      res,
      400,
      value.error,
      value.error.details[0].message
        ? value.error.details[0].message
        : 'Bad request'
    );
  } else {
    next();
  }
};


// add property board schema validation
export const addProeprtyInboardValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    tenantId: Joi.string().required(),
    propertyId: Joi.string().required(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return failureResponse(
      res,
      400,
      value.error,
      value.error.details[0].message
        ? value.error.details[0].message
        : 'Bad request'
    );
  } else {
    next();
  }
};

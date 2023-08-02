import Joi from '@hapi/joi';
import { failureResponse } from '../helpers/api-response.helper';
import {
  furnishingType,
  houseConfiguration,
  houseType,
  staticStatus,
} from '../constants/global.constants';

// Check validations while add buyer
export const buyertDetailValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    panNumber: Joi.string().required(),
    houseConfiguration: Joi.string()
      .valid(...Object.values(houseConfiguration))
      .optional(),
    houseType: Joi.string()
      .valid(...Object.values(houseType))
      .optional(),
    furnishingType: Joi.string()
      .valid(...Object.values(furnishingType))
      .optional(),
    preferredLocation: Joi.string().optional(),
    moveIn: Joi.string().optional(),
    budget: Joi.string().optional(),
    version: Joi.number().optional(),
    propertyAgentId: Joi.string().optional(),
  });
  const value = schema.validate(req.body.buyerData);
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

export const addBuyerValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    status: Joi.string()
      .valid(...Object.keys(staticStatus))
      .optional(),
    buyerDetails: Joi.array().items(Joi.string()).optional(),
    buyerData: Joi.any().optional(),
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

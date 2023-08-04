import Joi from '@hapi/joi';
import { failureResponse } from '../helpers/api-response.helper';
import {
  furnishingType,
  houseConfiguration,
  houseType,
  tenantStatus,
  tenantDeactivationReason,
} from '../constants/global.constants';

// Check validations while add tenant
export const tenantDetailValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    propertyAgentId: Joi.string().optional(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    stayDuration: Joi.string().optional(),
    numberOfMonth: Joi.number().integer().min(1).max(12).optional(),
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
    rent: Joi.number().optional(),
    gatedSecurity: Joi.boolean().optional(),
    powerBackup: Joi.boolean().optional(),
    groceryStore: Joi.boolean().optional(),
    swimmingPool: Joi.boolean().optional(),
    gym: Joi.boolean().optional(),
    clubHouse: Joi.boolean().optional(),
    carParking: Joi.boolean().optional(),
    bikeParking: Joi.boolean().optional(),
    ac: Joi.boolean().optional(),
    nonVeg: Joi.boolean().optional(),
    bathroom: Joi.boolean().optional(),
    onBoard: Joi.boolean().optional(),
    deactivateDate: Joi.date().optional(),
    deactivateReason: Joi.string().optional(),
    deactivateSubReason: Joi.string().optional(),
    version: Joi.number().optional(),
  });
  const value = schema.validate(req.body.tenantData);
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

export const addTenantValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    status: Joi.string()
      .valid(...Object.keys(tenantStatus))
      .optional(),
    deactivateStatus: Joi.string()
      .valid(...Object.values(tenantDeactivationReason))
      .optional(),
    tenantDetails: Joi.array().items(Joi.string()).optional(),
    tenantData: Joi.any().optional(),
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

// Tenant deactivate status
export const tenantStatusValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    deactivateStatus: Joi.string()
      .valid(...Object.values(tenantDeactivationReason))
      .required(),
    tenantId: Joi.string().required(),
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

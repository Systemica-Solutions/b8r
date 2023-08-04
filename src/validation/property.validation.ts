import Joi from '@hapi/joi';
import {
  houseType,
  houseConfiguration,
  carParking,
  bikeParking,
  parkingType,
  houseHelpRoom,
  furnishingType,
  staticStatus,
  propertyStatus,
} from '../constants/global.constants';
import { failureResponse } from '../helpers/api-response.helper';

// Check validations while add property
export const propertyDetailValidation = async (req, res, next) => {
  const propertyBasicInfo = Joi.object().keys({
    houseNum: Joi.string().optional(),
    societyType: Joi.string().optional(),
    houseType: Joi.string()
      .valid(...Object.values(houseType))
      .optional(),
    houseConfig: Joi.string()
      .valid(...Object.values(houseConfiguration))
      .optional(),
    area: Joi.string().optional(),
    mapLocation: Joi.string().optional(),
    purposeRent: Joi.boolean().required(),
    purposeSale: Joi.boolean().required(),
    rented: Joi.boolean().optional(),
    lastEditDate: Joi.date().optional(),
    verifyDate: Joi.date().optional(),
    closeDate: Joi.date().optional(),
    closureReason: Joi.string().optional(),
    closureSubReason: Joi.string().optional(),
  });

  const ownerBasicInfo = Joi.object().keys({
    name: Joi.object().keys({
      first: Joi.string().required(),
      last: Joi.string().required(),
    }),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    panNumber: Joi.string().optional(),
    country: Joi.string().required(),
    city: Joi.string().optional(),
  });

  const featureBasicInfo = Joi.object().keys({
    gatedSecurity: Joi.boolean().optional(),
    powerBackup: Joi.boolean().optional(),
    groceryStore: Joi.boolean().optional(),
    swimmingPool: Joi.boolean().optional(),
    gym: Joi.boolean().optional(),
    clubHouse: Joi.boolean().optional(),
    carpetArea: Joi.number().optional(),
    floors: Joi.object().keys({
      total: Joi.number().optional(),
      your: Joi.number().optional(),
    }),
    parking: Joi.object().keys({
      car: Joi.string()
        .valid(...Object.keys(carParking))
        .optional(),
      bike: Joi.string()
        .valid(...Object.keys(bikeParking))
        .optional(),
      type: Joi.string()
        .valid(...Object.keys(parkingType))
        .optional(),
    }),
    houseHelpRoom: Joi.string()
      .valid(...Object.keys(houseHelpRoom))
      .optional(),
    bathrooms: Joi.number().integer().min(1).max(10).optional(),
    balconies: Joi.number().integer().min(1).max(10).optional(),
    furnishingType: Joi.string()
      .valid(...Object.keys(furnishingType))
      .optional(),
    ac: Joi.boolean().optional(),
    nonVeg: Joi.boolean().optional(),
    constructionYear: Joi.string().optional(),
    availableFrom: Joi.date().iso().optional(),
    rentAmount: Joi.when(Joi.ref('...propertyInfo.purposeRent'), {
      is: true,
      then: Joi.number().required(),
      otherwise: Joi.number().optional(),
    }),
    rentDeposit: Joi.when(Joi.ref('...propertyInfo.purposeRent'), {
      is: true,
      then: Joi.number().required(),
      otherwise: Joi.number().optional(),
    }),
    rentMaintenance: Joi.when(Joi.ref('...propertyInfo.purposeRent'), {
      is: true,
      then: Joi.number().required(),
      otherwise: Joi.number().optional(),
    }),
    lockInPeriod: Joi.when(Joi.ref('...propertyInfo.purposeRent'), {
      is: true,
      then: Joi.number().integer().min(1).max(12).required(),
      otherwise: Joi.number().integer().min(1).max(12).optional(),
    }),
    saleAmount: Joi.when(Joi.ref('...propertyInfo.purposeSale'), {
      is: true,
      then: Joi.number().required(),
      otherwise: Joi.number().optional(),
    }),
    saleDeposit: Joi.when(Joi.ref('...propertyInfo.purposeSale'), {
      is: true,
      then: Joi.number().required(),
      otherwise: Joi.number().optional(),
    }),
    saleMaintenance: Joi.when(Joi.ref('...propertyInfo.purposeSale'), {
      is: true,
      then: Joi.number().required(),
      otherwise: Joi.number().optional(),
    }),
    moveInFrom: Joi.when(Joi.ref('...propertyInfo.purposeSale'), {
      is: true,
      then: Joi.number().required(),
      otherwise: Joi.number().optional(),
    }),
  });

  const verifyBasicInfo = Joi.object().keys({
    liftLobby: Joi.boolean().optional(),
    entryDoor: Joi.boolean().optional(),
    homeEntry: Joi.boolean().optional(),
    livingRoom: Joi.boolean().optional(),
    tvArea: Joi.boolean().optional(),
    kitchen: Joi.boolean().optional(),
    utilityArea: Joi.boolean().optional(),
    backyard: Joi.boolean().optional(),
    commonWashroom: Joi.boolean().optional(),
    livingRoomBalcony: Joi.boolean().optional(),
    mainGate: Joi.boolean().optional(),
    clubHouse: Joi.boolean().optional(),
    groceryStore: Joi.boolean().optional(),
    swimmingPool: Joi.boolean().optional(),
    gym: Joi.boolean().optional(),
    parking: Joi.boolean().optional(),
    feature1: Joi.string().optional(),
    feature2: Joi.string().optional(),
    feature3: Joi.string().optional(),
  });

  const schema = Joi.object().keys({
    version: Joi.number().optional(),
    propertyAgentId: Joi.string().optional(),
    propertyInfo: propertyBasicInfo.required(),
    ownerInfo: ownerBasicInfo.required(),
    featureInfo: featureBasicInfo.required(),
    verifyInfo: verifyBasicInfo.optional(),
  });
  const value = schema.validate(req.body.propertyData);
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

export const addPropertyValidation = async (req, res, next) => {
  const closeListingData = Joi.object().keys({
    name: Joi.string().optional(),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    rentAmount: Joi.number().optional(),
    agreementFor: Joi.number().integer().min(1).max(12).optional(),
    tenancyStartDate: Joi.date().optional(),
    feedback: Joi.string().optional(),
  });

  const schema = Joi.object().keys({
    houseName: Joi.string().optional(),
    societyName: Joi.string().optional(),
    pinCode: Joi.string()
      .pattern(/^[0-9]{6}$/)
      .optional(),
    status: Joi.string()
      .valid(...Object.keys(staticStatus))
      .optional(),
    propertyData: Joi.any().optional(),
    propertyDetails: Joi.array().items(Joi.string()).optional(),
    images: Joi.array().items(Joi.string()).optional(),
    tourLink3D: Joi.string().optional(),
    closeListingStatus: Joi.string()
      .valid(...Object.keys(propertyStatus))
      .optional(),
    closeListingDetails: closeListingData.optional(),
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

// Verify property validations
export const verifyPropertyValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    houseName: Joi.string().optional(),
    societyName: Joi.string().optional(),
    pinCode: Joi.string()
      .pattern(/^[0-9]{6}$/)
      .optional(),
    status: Joi.string()
      .valid(...Object.keys(staticStatus))
      .optional(),
    propertyData: Joi.any().optional(),
    propertyDetails: Joi.array().items(Joi.string()).optional(),
    images: Joi.array().items(Joi.string()).required(),
    tourLink3D: Joi.string().required(),
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

// Close-listing status validation
export const closeListingValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    propertyId: Joi.string().required(),
    closeListingStatus: Joi.string()
      .valid(...Object.keys(propertyStatus))
      .required(),
    closeListingDetails: Joi.object().keys({
      name: Joi.string().optional(),
      phoneNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
      rentAmount: Joi.number().optional(),
      agreementFor: Joi.string().optional(),
      tenancyStartDate: Joi.date().iso().optional(),
      feedback: Joi.string().optional(),
    }),
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

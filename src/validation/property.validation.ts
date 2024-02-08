import Joi from '@hapi/joi';
import { Types } from 'mongoose';
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
  closeListing3,
  closeListing1,
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
      .optional(),
    panNumber: Joi.string().optional(),
    country: Joi.string().optional(),
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
      then: Joi.date().iso().required(),
      otherwise: Joi.date().iso().optional(),
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
    agentId: Joi.string().optional(),
    propertyInfo: propertyBasicInfo.required(),
    ownerInfo: ownerBasicInfo.optional(),
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
      .optional(),
    rentAmount: Joi.number().optional(),
    agreementFor: Joi.number().integer().min(1).max(12).optional(),
    tenancyStartDate: Joi.date().iso().optional(),
    feedback: Joi.string().optional(),
  });

  const reactivateData = Joi.object().keys({
    tenantName: Joi.string().optional(),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional(),
    vacanyDate: Joi.date().iso().optional(),
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
    closeListingReason: Joi.string()
      .valid(...Object.keys(propertyStatus))
      .optional(),
    closeListingDetails: closeListingData.optional(),
    reactivateDetails: reactivateData.optional(),
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

// Edit property validations
export const editPropertyValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    houseName: Joi.string().optional(),
    societyName: Joi.string().optional(),
    pinCode: Joi.string()
      .pattern(/^[0-9]{6}$/)
      .optional(),
    // propertyData: Joi.any().optional(),
    propertyDetails: Joi.any().optional(),
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
    const userId = req.user.user._id;
    req.body.propertyDetails.agentId = new Types.ObjectId(userId);
    next();
  }
};

// Verify property details validations
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
    propertyDetails: Joi.any().optional(),
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
    const userId = req.user.user._id;
    req.body.propertyDetails.agentId = new Types.ObjectId(userId);
    next();
  }
};

// Close-listing status validation
export const closeListingValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    closeListingReason: Joi.string()
      .valid(...Object.keys(propertyStatus))
      .required(),
    closeListingDetails: Joi.object().keys({
      tenantName: Joi.string().optional(),
      phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).optional(),
      rentAmount: Joi.number().optional(),
      agreementFor: Joi.string().optional(),
      tenancyStartDate: Joi.date().iso().optional(),
      feedback: Joi.string().optional()
      // tenantName: Joi.string().when('closeListingReason', {
      //   is: Joi.valid(...Object.keys(closeListing1)),
      //   then: Joi.string().required(),
      //   otherwise: Joi.string().optional(),
      // }),
      // phoneNumber: Joi.string().when('closeListingReason', {
      //   is: Joi.valid(
      //     'Rented of B8R',
      //     'Rented Outside',
      //     'Sold on B8R',
      //     'Sold Outside'
      //   ),
      //   then: Joi.string().pattern(/^[0-9]{10}$/).required(),
      //   otherwise: Joi.string().pattern(/^[0-9]{10}$/).optional(),
      // }),
      // rentAmount: Joi.number().when('closeListingReason', {
      //   is: Joi.valid(
      //     'Rented of B8R',
      //     'Rented Outside',
      //     'Sold on B8R',
      //     'Sold Outside'
      //   ),
      //   then: Joi.number().required(),
      //   otherwise: Joi.number().optional(),
      // }),
      // agreementFor: Joi.string().when('closeListingReason', {
      //   is: Joi.valid(
      //     'Rented of B8R',
      //     'Rented Outside',
      //     'Sold on B8R',
      //     'Sold Outside'
      //   ),
      //   then: Joi.string().required(),
      //   otherwise: Joi.string().optional(),
      // }),
      // tenancyStartDate: Joi.date().when('closeListingReason', {
      //   is: Joi.valid('Rented of B8R', 'Sold on B8R'),
      //   then: Joi.date().iso().required(),
      //   otherwise: Joi.date().iso().optional(),
      // }),
      // feedback: Joi.string().when('closeListingReason', {
      //   is: Joi.valid(...Object.keys(closeListing3) ),
      //   then: Joi.string().required(),
      //   otherwise: Joi.string().optional(),
      // }),
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

// Reactivate property validation
export const reactivateValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    reactivateDetails: Joi.object().keys({
      tenantName: Joi.string().optional(),
      phoneNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .optional(),
      vacanyDate: Joi.date().iso().optional(),
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

export const propertyDetailVerificationValidation = async (req, res, next) => {
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
      .optional(),
    panNumber: Joi.string().optional(),
    country: Joi.string().optional(),
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
      then: Joi.date().iso().required(),
      otherwise: Joi.date().iso().optional(),
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
    agentId: Joi.any().optional(),
    propertyInfo: propertyBasicInfo.required(),
    ownerInfo: ownerBasicInfo.optional(),
    featureInfo: featureBasicInfo.required(),
    verifyInfo: verifyBasicInfo.optional(),
  });
  console.log('req.body', req.body);
  const value = schema.validate(req.body.propertyDetails);
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

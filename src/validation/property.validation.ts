import Joi from '@hapi/joi';
import { houseType, houseConfiguration, carParking, bikeParking, parkingType, houseHelpRoom, furnishingType, propertyStatus } from '../constants/global.constants';
import { failureResponse } from '../helpers/api-response.helper';

// Check validations while add property
export const addPropertyValidation = async (req, res, next) => {
    const schema = Joi.object().keys({
        propertyInfo: propertyBasicInfo.required(),
        ownerInfo: ownerBasicInfo.required(),
        featureInfo: featureBasicInfo.required(),
        statusInfo: statusInfo.required()
    });
    const value = schema.validate(req.body);
    if (value.error) {
        return failureResponse(
            res,
            400,
            value.error,
            value.error.details[0].message ? value.error.details[0].message : 'Bad request'
        );
    } else {
        next();
    }
};

const propertyBasicInfo = Joi.object().keys({
    houseType:  Joi.string().valid(...Object.values(houseType)).optional(),
    houseConfig: Joi.string().valid(...Object.values(houseConfiguration)).optional(),
    houseName: Joi.string().optional(),
    societyName: Joi.string().optional(),
    pinCode: Joi.string().pattern(/^[0-9]{6}$/).optional(),
    area: Joi.string().optional(),
    mapLocation: Joi.string().optional(),
    purpose: Joi.object().keys({
        rent: Joi.boolean().optional(),
        sale: Joi.boolean().optional()
    })
});

const ownerBasicInfo = Joi.object().keys({
    name: Joi.object().keys({
        first: Joi.string().required(),
        last: Joi.string().required()
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
    panNumber: Joi.string().optional(),
    country: Joi.string().required(),
    city: Joi.string().optional(),
});

const featureBasicInfo = Joi.object().keys({
    gatedSecurity: Joi.boolean().optional(),
    twentyFourSeven: Joi.boolean().optional(),
    groceryStore: Joi.boolean().optional(),
    swimmingPool: Joi.boolean().optional(),
    gym: Joi.boolean().optional(),
    clubHouse: Joi.boolean().optional(),
    carpetArea: Joi.number().optional(),
    floors: Joi.object().keys({
        total: Joi.number().optional(),
        your: Joi.number().optional()
    }),
    parking: Joi.object().keys({
        car: Joi.string().valid(...Object.keys(carParking)).optional(),
        bike: Joi.string().valid(...Object.keys(bikeParking)).optional(),
        type: Joi.string().valid(...Object.keys(parkingType)).optional()
    }),
    houseHelpRoom:  Joi.string().valid(...Object.keys(houseHelpRoom)).optional(),
    bathrooms: Joi.number().integer().min(0).max(10).optional(),
    balconies: Joi.number().integer().min(0).max(10).optional(),
    furnishingType: Joi.string().valid(...Object.keys(furnishingType)).optional(),
    ac: Joi.boolean().optional(),
    nonVeg: Joi.boolean().optional(),
    constructionYear:  Joi.string().optional(),
    availableFrom: Joi.string().optional(),
    rent: Joi.object().keys({
        amount: Joi.number().optional(),
        deposit: Joi.number().optional(),
        maintenance: Joi.number().optional(),
        lockInPeriod: Joi.number().optional(),
    }),
    sale: Joi.object().keys({
        amount: Joi.number().optional(),
        deposit: Joi.number().optional(),
        maintenance: Joi.number().optional(),
        moveIn: Joi.number().optional(),
    })
});

const statusInfo = Joi.object().keys({
    userId: Joi.string().optional(),
    version: Joi.number().optional(),
    status: Joi.string().valid(...Object.keys(propertyStatus)).optional(),
    lastEditDate: Joi.date().optional(),
    verifyDate: Joi.date().optional(),
    closeDate: Joi.date().optional(),
    closureReason: Joi.string().optional(),
    closureSubReason: Joi.string().optional(),
});

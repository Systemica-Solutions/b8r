import Joi from '@hapi/joi';
import { houseType, houseConfiguration, carParking, bikeParking, parkingType, houseHelpRoom, furnishingType } from '../constants/global.constants';
import { failureResponse } from '../helpers/api-response.helper';

// Check validation while add property
export const addPropertyValidation = async (req, res, next) => {
    const schema = Joi.object().keys({
        propertyInfo: propertyBasicInfo.required(),
        ownerInfo: ownerBasicInfo.required(),
        featureInfo: featureBasicInfo.required(),
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
    houseType:  Joi.string().valid(...Object.values(houseType)),
    houseConfig: Joi.string().valid(...Object.values(houseConfiguration)),
    houseName: Joi.string().optional(),
    societyName: Joi.string().optional(),
    pinCode: Joi.string().optional(),
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
    phoneNumber: Joi.string().optional(),
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
    carpetArea: Joi.string().optional(),
    floors: Joi.object().keys({
        total: Joi.number().optional(),
        your: Joi.number().optional()
    }),
    parking: Joi.object().keys({
        car: Joi.string().valid(...Object.keys(carParking)),
        bike: Joi.string().valid(...Object.keys(bikeParking)),
        type: Joi.string().valid(...Object.keys(parkingType))
    }),
    houseHelpRoom:  Joi.string().valid(...Object.keys(houseHelpRoom)),
    bathrooms: Joi.number().optional(),
    balconies: Joi.number().optional(),
    furnishingType:  Joi.string().valid(...Object.keys(furnishingType)),
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

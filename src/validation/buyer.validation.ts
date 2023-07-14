import Joi from '@hapi/joi';
import { failureResponse } from '../helpers/api-response.helper';
import { furnishingType, houseConfiguration, houseType, staticStatus } from '../constants/global.constants';

// Check validations while add buyer
export const addBuyerValidation = async (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
        panNumber: Joi.string().required(),
        houseConfiguration: Joi.string().valid(...Object.values(houseConfiguration)).optional(),
        houseType: Joi.string().valid(...Object.values(houseType)).optional(),
        furnishingType: Joi.string().valid(...Object.values(furnishingType)).optional(),
        preferredLocation: Joi.string().optional(),
        moveIn: Joi.string().optional(),
        budget: Joi.string().optional(),
        status: Joi.string().valid(...Object.keys(staticStatus)).optional(),
        version: Joi.number().optional(),
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

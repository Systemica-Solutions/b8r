import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../helpers/api-response.helper';
import Property from '../models/property.model';

// Add new property
export const addProperty = async (req: Request, res: Response) => {
    try {
        req.body.createdBy = req.user.user._id;
        const propertyObj = new Property(req.body);
        const saveObj = await propertyObj.save();
        return successResponse(res, 200, { property: saveObj }, 'New property added successfully.');
    } catch (error) {
        return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
    }
};


//  Get all properties
export const getAllPropertyList = async (_: Request, res: Response) => {
    try {
        const properties = await Property.find().lean();
        if (!properties) {
          throw { status: 404, message: 'Properties not found.' };
        }
        return successResponse(res, 200, { properties }, 'Properties found successfully.');
      } catch (error) {
        return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
    }
};


// Get propert by id
export const getPriorityById = async (req: Request, res: Response) => {
    try {
        const property = await Property.findById(req.params.id).lean();
        if (!property) {
          return failureResponse(res, 404, [], 'Property not found.');
        }
        return successResponse(res, 200, { property}, 'Property found successfully.');
      } catch (error) {
        return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
      }
};

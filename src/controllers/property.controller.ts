import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../helpers/api-response.helper';
import Property from '../models/property.model';
import { Types } from 'mongoose';


// Add new property
export const addProperty = async (req: Request, res: Response) => {
    try {
        const propertyData = req.body;
        propertyData.statusInfo.userId = new Types.ObjectId(req.user.user._id);
        propertyData.statusInfo.lastEditDate = Date.now();

        //  Check version of property based on below conditions while add new property
        //   1. If same user try to enter again same value for houseName, societyName, pinCode & status then
        //         it should return as already exist property with this values
        //   2. If another user try to add property and it matches with houseName, societyName, pinCode & status then increment it's version
        Property.find({ $and: [
          { 'propertyInfo.houseName': propertyData.propertyInfo.houseName },
          { 'propertyInfo.societyName': propertyData.propertyInfo.societyName },
          { 'propertyInfo.pinCode': propertyData.propertyInfo.pinCode },
          { 'statusInfo.status': propertyData.statusInfo.status },
        ]}).exec(async (error: any, propertyExist: any) => {
            if (error) { return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong'); }
            else if (propertyExist && propertyExist.length) {
              const userProperty = propertyExist.filter((x) => x.statusInfo.userId.equals(propertyData.statusInfo.userId));
              if (userProperty && userProperty.length) {
                return failureResponse(res, 403, [], 'Property already exist with this value');
              }
              else { propertyData.statusInfo.version = propertyExist[propertyExist.length - 1].statusInfo.version + 1; }
            }
            const propertyObj = new Property(propertyData);
            const saveObj = await propertyObj.save();
            return successResponse(res, 200, { property: saveObj }, 'New property added successfully.');
          });
    } catch (error) {
      return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
    }
};


//  Get all properties
export const getAllPropertyList = async (_: Request, res: Response) => {
    try {
        const properties = await Property.find().lean();
        if (!properties) {
          return failureResponse(res, 404, [], 'Properties not found.');
        }
        return successResponse(res, 200, { properties }, 'Properties found successfully.');
      } catch (error) {
        return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
    }
};


// Get property by id
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

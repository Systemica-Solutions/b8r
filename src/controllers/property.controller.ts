import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../helpers/api-response.helper';
import Property from '../models/property.model';
import PropertyDetail from '../models/propertyDetail.model';
import { Types } from 'mongoose';


// Add new property
export const addProperty = async (req: Request, res: Response) => {
    try {
        const tempData = req.body;
        tempData.propertyData.userId = new Types.ObjectId(req.user.user._id);

        //  Check version of property based on below conditions while add new property
        //   1. If same user try to enter again same value for houseName, societyName, pinCode & status then
        //         it should return as already exist property with this values
        //   2. If another user try to add property and it matches with houseName, societyName, pinCode & status then increment it's version
        Property.find({ $and: [
          { houseName: tempData.houseName },
          { societyName: tempData.societyName },
          { pinCode: tempData.pinCode },
          { status: tempData.status },
        ]}).populate('propertyDetails').exec(async (error: any, propertyExist: any) => {
            if (error) { return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong'); }
            else if (propertyExist && propertyExist.length) {
              const userProperty = propertyExist[0].propertyDetails.filter((x) => x.userId.equals(tempData.propertyData.userId));
              if (userProperty && userProperty.length) {
                return failureResponse(res, 403, [], 'Property already exist with this value');
              }
              else {
                tempData.propertyData.version = propertyExist[0].propertyDetails.length + 1;
                const detailObj =  new PropertyDetail(tempData.propertyData);
                const savedObj: any = await detailObj.save();
                updatePropertyDetails(propertyExist[0]._id, savedObj._id, res);
              }
            } else {
              const detailObj =  new PropertyDetail(tempData.propertyData);
              const savedObj: any = await detailObj.save();
              const propertyObj = new Property(tempData);
              const saveObj = await propertyObj.save();
              updatePropertyDetails(saveObj._id, savedObj._id, res);
            }
          });
    } catch (error) {
      return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
    }
};


// Push property detail id in property table
const updatePropertyDetails = (id, detailsId, res) => {
  const detailId = new Types.ObjectId(detailsId);
  Property.findByIdAndUpdate({ _id: id }, { $push: { propertyDetails: detailId } }, { new: true })
    .populate('propertyDetails').exec((error, updatedRecord) => {
        if (error) {
            console.log('error while update', error);
            return failureResponse(res, 500, [], error.message || 'Something went wrong');
        } else {
            console.log('updatedRecord.......', updatedRecord);
            return successResponse(res, 200, { property: updatedRecord }, 'New property added successfully.');
         }
    });
};


//  Get all properties
export const getAllPropertyList = async (_: Request, res: Response) => {
    try {
        const properties = await Property.find().populate('propertyDetails').lean();
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

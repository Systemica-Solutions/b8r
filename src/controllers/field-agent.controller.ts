import { Request, Response } from 'express';
import {
  successResponse,
  failureResponse,
} from '../helpers/api-response.helper';
import Property from '../models/property.model';
import PropertyDetail from '../models/propertyDetail.model';
import AssignedProperty from '../models/assignedProperty.model';
import { Types } from 'mongoose';
import { updatePropertyDetails } from './property.controller';

// Verify property
export const verifyProperty = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    tempData.propertyData.agentId = new Types.ObjectId(req.user.user._id);
    const proeprty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        $set: tempData,
      },
      { new: true }
    );
    if (!proeprty) {
      return failureResponse(res, 404, [], 'Proeprty not found.');
    }
    console.log('property get', proeprty);
    tempData.propertyData.version = proeprty.propertyDetails.length + 1;
    const detailObj = new PropertyDetail(tempData.propertyData);
    const savedObj: any = await detailObj.save();
    updatePropertyDetails(proeprty._id, savedObj._id, res);
    // tempData.status = 'Verified';
    // Property.find({
    //   $and: [
    //     { houseName: tempData.houseName },
    //     { societyName: tempData.societyName },
    //     { pinCode: tempData.pinCode },
    //   ],
    // })
    //   .populate('propertyDetails')
    //   .exec(async (error: any, propertyExist: any) => {
    //     if (error) {
    //       return failureResponse(
    //         res,
    //         error.status || 500,
    //         error,
    //         error.message || 'Something went wrong'
    //       );
    //     } else if (propertyExist && propertyExist.length) {
    //       tempData.propertyData.version =
    //         propertyExist[0].propertyDetails.length + 1;
    //       const detailObj = new PropertyDetail(tempData.propertyData);
    //       const savedObj: any = await detailObj.save();
    //       updatePropertyDetails(propertyExist[0]._id, savedObj._id, res);
    //     } else {
    //       const detailObj = new PropertyDetail(tempData.propertyData);
    //       const savedObj: any = await detailObj.save();
    //       const propertyObj = new Property(tempData);
    //       const saveObj = await propertyObj.save();
    //       updatePropertyDetails(saveObj._id, savedObj._id, res);
    //     }
    //   });
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Get pending property for field agent dashboard
export const getFieldAgentPendingProperty = async (
  req: Request,
  res: Response
) => {
  try {
    const agentId = new Types.ObjectId(req.user.user._id);
    const property = await AssignedProperty.find({
      fieldAgentId: agentId,
    })
      .populate('propertyImageId')
      .populate({ path: 'propertyId', populate: { path: 'propertyDetails' } });
    if (!property) {
      return failureResponse(res, 500, [], 'Something went wrong');
    }
    const pendingList = property.filter(
      (x) => x.propertyId.status === 'Pending'
    );
    return successResponse(
      res,
      200,
      { property: pendingList },
      'Pending property list get successfully.'
    );
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Get property counts in field-agent dashboard
export const getFieldAgentHomeCount = async (req: Request, res: Response) => {
  try {
    const pendingProperties = [];
    const verifiedProperties = [];
    const agentId = new Types.ObjectId(req.user.user._id);
    const property = await AssignedProperty.find({
      fieldAgentId: agentId,
    }).populate('propertyId');
    if (!property) {
      return failureResponse(res, 500, [], 'Something went wrong');
    }
    property.forEach(function(doc) {
      if (doc.propertyId.status === 'Pending') {
        pendingProperties.push(doc);
      } else if (doc.propertyId.status === 'Verified') {
        verifiedProperties.push(doc);
      }
    });
    return successResponse(
      res,
      200,
      {
        pending: pendingProperties.length,
        verified: verifiedProperties.length,
      },
      'Property found successfully.'
    );
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

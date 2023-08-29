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

// Add 3D tour link and change status to verified
export const add3DTourLink = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    Property.findOneAndUpdate(
      { _id: req.params.id, imagesApproved: true },
      {
        $set: { tourLink3D: tempData.tourLink3D, status: 'Verified' },
      },
      { new: true }
    )
      .populate('propertyDetails')
      .exec((error, updatedRecord) => {
        if (error) {
          console.log('error while update', error);
          return failureResponse(
            res,
            500,
            [],
            error.message || 'Something went wrong'
          );
        } else if (!updatedRecord || updatedRecord === null) {
          return failureResponse(
            res,
            500,
            [],
            'Property should be verified after upload and approve image'
          );
        } else {
          updatedRecord.propertyDetails =
          updatedRecord.propertyDetails[
            updatedRecord.propertyDetails.length - 1
          ];
          return successResponse(
            res,
            200,
            { property: updatedRecord },
            'Link added successfully.'
          );
        }
      });
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Verify property
export const verifyProperty = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    tempData.propertyData.agentId = new Types.ObjectId(req.user.user._id);
    tempData.fieldAgentStatus = 'Completed';
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
    updatePropertyDetails(proeprty._id, savedObj._id, res, 'verified');
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
      (x) => x.propertyId.fieldAgentStatus === 'Pending'
    );
    pendingList.forEach((item) => {
      const lastElement = item.propertyId.propertyDetails[item.propertyId.propertyDetails.length - 1];
      item.propertyId.propertyDetails = [lastElement];
    });
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
    const completedProperties = [];
    const agentId = new Types.ObjectId(req.user.user._id);
    const property = await AssignedProperty.find({
      fieldAgentId: agentId,
    }).populate('propertyId');
    if (!property) {
      return failureResponse(res, 500, [], 'Something went wrong');
    }
    property.forEach(function(doc) {
      if (doc.propertyId.fieldAgentStatus === 'Pending') {
        pendingProperties.push(doc);
      } else if (doc.propertyId.fieldAgentStatus === 'Completed') {
        completedProperties.push(doc);
      }
    });
    return successResponse(
      res,
      200,
      {
        pending: pendingProperties.length,
        completed: completedProperties.length,
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

import { Request, Response } from 'express';
import {
  successResponse,
  failureResponse,
} from '../helpers/api-response.helper';
import Property from '../models/property.model';
import PropertyDetail from '../models/propertyDetail.model';
import AssignedProperty from '../models/assignedProperty.model';
import { PipelineStage, Types } from 'mongoose';
import { count } from 'console';

// Add new property
export const addProperty = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    tempData.propertyData.propertyAgentId = new Types.ObjectId(
      req.user.user._id
    );

    //  Check version of property based on below conditions while add new property
    //   1. If same user try to enter again same value for houseName, societyName, pinCode then
    //         it should return as already exist property with this values
    //   2. If another user try to add property and it matches with houseName, societyName, pinCode then increment it's version
    Property.find({
      $and: [
        { houseName: tempData.houseName },
        { societyName: tempData.societyName },
        { pinCode: tempData.pinCode },
      ],
    })
      .populate('propertyDetails')
      .exec(async (error: any, propertyExist: any) => {
        if (error) {
          return failureResponse(
            res,
            error.status || 500,
            error,
            error.message || 'Something went wrong'
          );
        } else if (propertyExist && propertyExist.length) {
          const userProperty = propertyExist[0].propertyDetails.filter((x) =>
            x.propertyAgentId.equals(tempData.propertyData.propertyAgentId)
          );
          if (userProperty && userProperty.length) {
            return failureResponse(
              res,
              403,
              [],
              'Property already exist with this value'
            );
          } else {
            tempData.propertyData.version =
              propertyExist[0].propertyDetails.length + 1;
            const detailObj = new PropertyDetail(tempData.propertyData);
            const savedObj: any = await detailObj.save();
            updatePropertyDetails(propertyExist[0]._id, savedObj._id, res);
          }
        } else {
          const detailObj = new PropertyDetail(tempData.propertyData);
          const savedObj: any = await detailObj.save();
          const propertyObj = new Property(tempData);
          const saveObj = await propertyObj.save();
          updatePropertyDetails(saveObj._id, savedObj._id, res);
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

// Push property detail id in property table
export const updatePropertyDetails = (id, detailsId, res) => {
  const detailId = new Types.ObjectId(detailsId);
  Property.findByIdAndUpdate(
    { _id: id },
    { $push: { propertyDetails: detailId } },
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
      } else {
        console.log('updatedRecord.......', updatedRecord);
        return successResponse(
          res,
          200,
          { property: updatedRecord },
          'New property added successfully.'
        );
      }
    });
};

//  Get all properties
export const getAllPropertyList = async (req: Request, res: Response) => {
  try {
    // It search based on houseName of property
    const searchText: any = req.query.search;
    // It filters based on status of property like New/Pending/Verified/Closed and also for archive filter of closeListingStatus
    const filter: any = req.query.filter;
    const userId = new Types.ObjectId(req.user.user._id);
    const aggregationPipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'propertydetails',
          localField: 'propertyDetails',
          foreignField: '_id',
          as: 'propertyDetails',
        },
      },
      {
        $match: {
          'propertyDetails.propertyAgentId': userId,
        },
      },
    ];
    if (searchText && searchText.trim()) {
      aggregationPipeline.push({
        $match: {
          houseName: {
            $regex: new RegExp('^' + searchText.trim().toLowerCase(), 'i'),
          },
        },
      });
    }
    if (filter && filter.trim()) {
      aggregationPipeline.push({
        $match: {
          $or: [
            {
              status: {
                $regex: new RegExp('^' + filter.trim().toLowerCase(), 'i'),
              },
            },
            {
              closeListingStatus: {
                $regex: new RegExp('^' + filter.trim().toLowerCase(), 'i'),
              },
            },
          ],
        },
      });
    }
    const properties = await Property.aggregate(aggregationPipeline);
    // const properties = await Property.find(query).populate('propertyDetails').lean();
    if (!properties) {
      return failureResponse(res, 404, [], 'Properties not found.');
    }
    return successResponse(
      res,
      200,
      { properties },
      'Properties found successfully.'
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

// Get property by id
export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('propertyDetails')
      .lean();
    if (!property) {
      return failureResponse(res, 404, [], 'Property not found.');
    }
    return successResponse(
      res,
      200,
      { property },
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

// Assign property to Field Agent
export const assignPropertyToFA = async (req: Request, res: Response) => {
  try {
    const dataObj = req.body;
    const existing = await AssignedProperty.findOne({
      propertyId: dataObj.propertyId,
    });
    if (existing) {
      return failureResponse(res, 403, [], 'Property already assigned');
    } else {
      const detailObj = new AssignedProperty(dataObj);
      const savedObj: any = await detailObj.save();
      const status = await changePropertyStatus(dataObj.propertyId, 'Pending');
      return successResponse(
        res,
        200,
        { assigned: savedObj },
        'Property assigned to field agent successfully.'
      );
    }
  } catch (error) {
    return failureResponse(
      res,
      500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Change property status
const changePropertyStatus = async (id, status) => {
  return await Property.findByIdAndUpdate(
    { _id: id },
    { $set: { status } },
    { new: true }
  );
};

// Get property dashboard count
export const getPropertyCounts = async (req: Request, res: Response) => {
 try{

 } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Edit property status with close listing property
export const closeListingProperty = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    const id = new Types.ObjectId(tempData.propertyId);
    Property.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          closeListingStatus: tempData.closeListingStatus,
          closeListingDetails: tempData.closeListingDetails,
          status: 'Closed',
        },
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
        } else {
          console.log('updatedRecord.......', updatedRecord);
          return successResponse(
            res,
            200,
            { property: updatedRecord },
            'Property status updated successfully.'
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

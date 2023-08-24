import { Request, Response } from 'express';
import {
  successResponse,
  failureResponse,
} from '../helpers/api-response.helper';
import Property from '../models/property.model';
import PropertyDetail from '../models/propertyDetail.model';
import AssignedProperty from '../models/assignedProperty.model';
import { PipelineStage, Types } from 'mongoose';
import {
  copyAndRenameS3Images,
  getAllPropertyS3Images,
  getS3ImagesByPropertyId,
} from './uploadImage.controller';
import { staticStatus } from '../constants/global.constants';

// Add new property
export const addProperty = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    tempData.propertyData.agentId = new Types.ObjectId(req.user.user._id);

    //  Check version of property based on below conditions while add new property
    //   1. If same agent try to enter again same value for houseName, societyName, pinCode then
    //         it should return as already exist property with this values
    //   2. If another agent try to add property and it matches with houseName, societyName, pinCode then increment it's version
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
          const agentProperty = propertyExist[0].propertyDetails.filter((x) =>
            x.agentId.equals(tempData.propertyData.agentId)
          );
          if (agentProperty && agentProperty.length) {
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
          'Property added successfully.'
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
    const imagesApproved = req.query.imagesApproved;
    const agentId = new Types.ObjectId(req.user.user._id);
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
          'propertyDetails.agentId': agentId,
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
    if (
      filter &&
      filter.trim() &&
      (filter.trim().toLowerCase() !== 'shortlisted' ||
        filter.trim().toLowerCase() !== 'Shared')
    ) {
      aggregationPipeline.push({
        $match: {
          houseName: {
            $regex: new RegExp('^' + searchText.trim().toLowerCase(), 'i'),
          },
        },
      });
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
    if (imagesApproved === 'false') {
      aggregationPipeline.push({ $match: { imagesApproved: false } });
    }
    if (imagesApproved === 'true') {
      aggregationPipeline.push({ $match: { imagesApproved: true } });
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
  try {
    const agentId = new Types.ObjectId(req.user.user._id);
    console.log('agentID', agentId);

    // status count
    const step0 = await Property.aggregate([
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
          'propertyDetails.agentId': agentId,
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          status: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);

    // shared count
    const step1 = await Property.aggregate([
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
          'propertyDetails.agentId': agentId,
          $expr: {
            $or: [
              { $gt: [{ $size: '$sharedProperty' }, 0] },
              { $gt: [{ $size: '$sharedBuyerProperty' }, 0] },
            ],
          },
        },
      },
    ]);

    // yet to shared count
    const step2 = await Property.aggregate([
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
          'propertyDetails.agentId': agentId,
          $expr: {
            $or: [
              { $eq: [{ $size: '$sharedProperty' }, 0] },
              { $eq: [{ $size: '$sharedBuyerProperty' }, 0] },
            ],
          },
        },
      },
    ]);

    // shortlisted property
    const step3 = await Property.aggregate([
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
          'propertyDetails.agentId': agentId,
        },
      },
      {
        $lookup: {
          from: 'sharedproperties',
          localField: 'sharedProperty',
          foreignField: '_id',
          as: 'sharedProperties',
        },
      },
      {
        $lookup: {
          from: 'sharedbuyerproperties',
          localField: 'sharedBuyerProperty',
          foreignField: '_id',
          as: 'sharedBuyerProperties',
        },
      },
      {
        $match: {
          $or: [
            { 'sharedProperties.isShortlisted': true },
            { 'sharedBuyerProperties.isShortlisted': true },
          ],
        },
      },
      {
        $group: {
          _id: 'Sortlisted',
          count: { $sum: 1 },
        },
      },
    ]);
    const newObj: any = {};
    for (const key in staticStatus) {
      if (typeof staticStatus[key] === 'string') {
        newObj[staticStatus[key]] = 0;
      }
    }
    let output: any = {};
    newObj.Total = 0;
    if (step0 && step0.length) {
      step0.forEach((item) => {
        newObj[item.status] = item.count;
        newObj.Total += item.count;
      });
    } else {
      output = newObj;
    }
    output.Shared = step1.length ? step1.length : 0;
    output.YetToShare = step2.length ? step2.length : 0;
    output.Sortlisted = step3 && step3.length ? step3[0].count : 0;
    output = { ...output, ...newObj };
    return successResponse(
      res,
      200,
      { counts: output },
      'Property dashboard count get successfully.'
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

// Check status of single property
export const getPropertyStatus = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate({
        path: 'sharedProperty',
        populate: { path: 'tenantId' },
      })
      .populate({
        path: 'sharedBuyerProperty',
        populate: { path: 'buyerId' },
      });
    return successResponse(
      res,
      200,
      { property },
      'Detailed property data get successfully.'
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

// Get property images from s3 by propertyId
export const getPropertyImagesFromS3 = async (req: Request, res: Response) => {
  try {
    const images = await getS3ImagesByPropertyId(req.params.id);
    return successResponse(res, 200, { images }, 'S3 images get successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Get property images from s3 for renaming file-name and copy those into final folder
export const renameAndCopyBoardImagesOfS3 = async (
  req: Request,
  res: Response
) => {
  const propertyId = req.params.id;
  try {
    const imgs = await copyAndRenameS3Images(propertyId, req.body.images);
    if (imgs && imgs.length) {
      Property.findByIdAndUpdate(
        { _id: propertyId },
        {
          $set: {
            imagesApproved: true,
          },
        },
        { new: true }
      ).exec((error, updatedRecord) => {
        if (error) {
          console.log('error while update', error);
          return failureResponse(
            res,
            500,
            [],
            error.message || 'Something went wrong'
          );
        } else {
          return successResponse(
            res,
            200,
            {},
            'Images has been renamed and copied successfully.'
          );
        }
      });
    }
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Get all property images fom s3 which are not moved to final folder yet
export const getAllPropertyImages = async (req: Request, res: Response) => {
  try {
    const data = await getAllPropertyS3Images();
    const propertyIds = data.map((item: any) => item.propertyId);
    const propertieData: any = await Property.find({
      _id: { $in: propertyIds },
      imagesApproved: false,
    });
    const propertiesData = data.filter((item) =>
      propertieData.some(
        (property) => property._id.toString() === item.propertyId
      )
    );
    return successResponse(
      res,
      200,
      { properties: propertiesData },
      'S3 images are get successfully.'
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

// Reactivate property and change status to verified
export const reactivateProperty = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    Property.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          reactivateDetails: tempData.reactivateDetails,
          status: 'Verified',
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
            'Property reactivated successfully.'
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

import { Request, Response } from 'express';
import {
  successResponse,
  failureResponse,
} from '../helpers/api-response.helper';
import Property from '../models/property.model';
import PropertyDetail from '../models/propertyDetail.model';
import AssignedProperty from '../models/assignedProperty.model';
import { PipelineStage, Types, set } from 'mongoose';
import {
  copyAndRenameS3Images,
  getAllPropertyS3Images,
  getS3ImagesByPropertyIdRaw,
  getS3ImagesFromFinalFolder,
} from './uploadImage.controller';
import Tenant from '../models/tenant.model';
import SharedProperty from '../models/sharedProperty.model';
// import sharedProperty from '../models/sharedProperty.model';
import { staticStatus } from '../constants/global.constants';
import Board from '../models/board.model';

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
            updatePropertyDetails(
              propertyExist[0]._id,
              savedObj._id,
              res,
              'added'
            );
          }
        } else {
          const detailObj = new PropertyDetail(tempData.propertyData);
          const savedObj: any = await detailObj.save();
          const propertyObj = new Property(tempData);
          const saveObj = await propertyObj.save();
          updatePropertyDetails(saveObj._id, savedObj._id, res, 'added');
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

// Edit property
export const editProperty = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    tempData.propertyDetails.agentId = new Types.ObjectId(req.user.user._id);

    const property = await Property.findByIdAndUpdate(req.params.id, {
      $set: {
        houseName: tempData.houseName,
        societyName: tempData.societyName,
        pinCode: tempData.pinCode,
      },
    });
    if (!property) {
      throw { status: 404, message: 'Property not found.' };
    }
    tempData.propertyDetails.version = property.propertyDetails.length + 1;
    const detailObj = new PropertyDetail(tempData.propertyDetails);
    const savedObj: any = await detailObj.save();
    updatePropertyDetails(property._id, savedObj._id, res, 'edited');
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
export const updatePropertyDetails = (id, detailsId, res, flag) => {
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
        updatedRecord.propertyDetails = [
          updatedRecord.propertyDetails[
            updatedRecord.propertyDetails.length - 1
          ],
        ];
        return successResponse(
          res,
          200,
          { property: updatedRecord },
          `Property ${flag} successfully.`
        );
      }
    });
};

function daysAgo(date) {
  const now = new Date();
  const differenceInMs = now.getTime() - date.getTime();
  const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  return days;
}
//  Get all properties
export const getAllPropertyList = async (req: Request, res: Response) => {
  try {
    // It search based on houseName of property
    const searchText: any = req.query.search;
    // It filters based on status of property like New/Pending/Verified/Closed and also for archive filter of closeListingReason
    const filter: any = req.query.filter;
    const imagesApproved = req.query.imagesApproved;
    const agentId = new Types.ObjectId(req.user.user._id);

    let aggregationPipeline: PipelineStage[] = [
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
      filter.trim().toLowerCase() !== 'shortlisted' &&
      filter.trim().toLowerCase() !== 'shared'
    ) {
      aggregationPipeline.push({
        $match: {
          $or: [
            {
              status: {
                $regex: new RegExp('^' + filter.trim().toLowerCase(), 'i'),
              },
            },
            {
              closeListingReason: {
                $regex: new RegExp('^' + filter.trim().toLowerCase(), 'i'),
              },
            },
          ],
        },
      });
    }

    if (filter && filter.trim() && filter.trim().toLowerCase() === 'shared') {
      aggregationPipeline.push({
        $match: {
          $expr: {
            $or: [
              { $gt: [{ $size: '$sharedProperty' }, 0] },
              { $gt: [{ $size: '$sharedBuyerProperty' }, 0] },
            ],
          },
        },
      });
    }

    if (
      filter &&
      filter.trim() &&
      filter.trim().toLowerCase() === 'shortlisted'
    ) {
      aggregationPipeline = aggregationPipeline.concat([
        {
          $lookup: {
            from: 'sharedbuyerproperties',
            localField: 'sharedBuyerProperty',
            foreignField: '_id',
            as: 'sharedBuyerProperty',
          },
        },
        {
          $lookup: {
            from: 'sharedproperties',
            localField: 'sharedProperty',
            foreignField: '_id',
            as: 'sharedProperty',
          },
        },
        {
          $match: {
            $or: [
              { 'sharedProperty.isShortlisted': true },
              { 'sharedBuyerProperty.isShortlisted': true },
            ],
          },
        },
      ]);
    }

    if (imagesApproved === 'false') {
      aggregationPipeline.push({ $match: { imagesApproved: false } });
    }
    if (imagesApproved === 'true') {
      aggregationPipeline.push({ $match: { imagesApproved: true } });
    }

    const properties = await Property.aggregate(aggregationPipeline);
    if (properties && properties.length) {
      properties.map(
        (x) =>
          (x.propertyDetails = x.propertyDetails[x.propertyDetails.length - 1])
      );
    }
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

// Get all properties in dB

export const getAllPropertyinDB = async (req: Request, res: Response) => {
  try {
    // It search based on houseName of property
    const searchText: any = req.query.search;
    // It filters based on status of property like New/Pending/Verified/Closed and also for archive filter of closeListingReason
    const filter: any = req.query.filter;
    const imagesApproved = req.query.imagesApproved;


    let aggregationPipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'propertydetails',
          localField: 'propertyDetails',
          foreignField: '_id',
          as: 'propertyDetails',
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
      filter.trim().toLowerCase() !== 'shortlisted' &&
      filter.trim().toLowerCase() !== 'shared'
    ) {
      aggregationPipeline.push({
        $match: {
          $or: [
            {
              status: {
                $regex: new RegExp('^' + filter.trim().toLowerCase(), 'i'),
              },
            },
            {
              closeListingReason: {
                $regex: new RegExp('^' + filter.trim().toLowerCase(), 'i'),
              },
            },
          ],
        },
      });
    }

    if (filter && filter.trim() && filter.trim().toLowerCase() === 'shared') {
      aggregationPipeline.push({
        $match: {
          $expr: {
            $or: [
              { $gt: [{ $size: '$sharedProperty' }, 0] },
              { $gt: [{ $size: '$sharedBuyerProperty' }, 0] },
            ],
          },
        },
      });
    }

    if (
      filter &&
      filter.trim() &&
      filter.trim().toLowerCase() === 'shortlisted'
    ) {
      aggregationPipeline = aggregationPipeline.concat([
        {
          $lookup: {
            from: 'sharedbuyerproperties',
            localField: 'sharedBuyerProperty',
            foreignField: '_id',
            as: 'sharedBuyerProperty',
          },
        },
        {
          $lookup: {
            from: 'sharedproperties',
            localField: 'sharedProperty',
            foreignField: '_id',
            as: 'sharedProperty',
          },
        },
        {
          $match: {
            $or: [
              { 'sharedProperty.isShortlisted': true },
              { 'sharedBuyerProperty.isShortlisted': true },
            ],
          },
        },
      ]);
    }

    if (imagesApproved === 'false') {
      aggregationPipeline.push({ $match: { imagesApproved: false } });
    }
    if (imagesApproved === 'true') {
      aggregationPipeline.push({ $match: { imagesApproved: true } });
    }

    const properties = await Property.aggregate(aggregationPipeline);
    if (properties && properties.length) {
      properties.map(
        (x) =>
          (x.propertyDetails = x.propertyDetails[x.propertyDetails.length - 1])
      );
    }
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
    property.propertyDetails =
      property.propertyDetails[property.propertyDetails.length - 1];
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
  if (status === 'Pending') {
    return await Property.findByIdAndUpdate(
      { _id: id },
      { $set: { status, fieldAgentStatus: status } },
      { new: true }
    );
  } else {
    return await Property.findByIdAndUpdate(
      { _id: id },
      { $set: { status } },
      { new: true }
    );
  }
};

const sharedProperties = async (agentId: Types.ObjectId) => {
  try {
    const boards = await Board.find({agentId});
    let sharedProperties = new Set()
    let propertyArray = [];
    boards.forEach((board) => {
      board.propertyId.forEach((property) => {
        const propertyId = property.toString()
        var length = sharedProperties.size;
        sharedProperties.add(propertyId);
        if(length < sharedProperties.size)
          propertyArray.push(property)
      });
    })  
    const result = await Property.find({ _id: { $in: propertyArray } });
    return result;
  } catch (error) {
    console.log(error);
  }
}

// Get property dashboard count
export const getPropertyCounts = async (req: Request, res: Response) => {
  try {
    const agentId = new Types.ObjectId(req.user.user._id);
    console.log(agentId);

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
    console.log('Step0', step0);

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

    // Verified Properties
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
          status: 'Verified',
          // $expr: {
          //   $or: [
          //     { $eq: [{ $size: '$sharedProperty' }, 0] },
          //     { $eq: [{ $size: '$sharedBuyerProperty' }, 0] },
          //   ],
          // },
        },
      },
    ]);
    // new function to calculate distinct properties shortlisted tenants of a particular agent
    async function step4(agentId) {
  try {
    // const filteredTenants = await Tenant.find({ agentId, status: { $ne: 'Deactivate' } });
    // const tenantIds = filteredTenants.map(tenant => tenant._id);
    // const matchingSharedProperties = await SharedProperty.find({ tenantId: { $in: tenantIds } });
    // const distinctPropertyIds = new Set();
    // matchingSharedProperties.forEach(sharedProp => {
    //   sharedProp.shortlistedProperties.forEach(propObj => {
    //     distinctPropertyIds.add(propObj.propertyId);
    //   });
    // });
    const boards = await Board.find({agentId});
    console.log(boards.length);

    const distinctPropertyIds = new Set();
    boards.forEach((board) => {
      board.isShortlisted.forEach((value, key) => {
        if (value === true) { distinctPropertyIds.add(key); }
      });
  });
    return distinctPropertyIds.size;

  } catch (error) {
    console.error('Error in Shortlisted Count:', error);
    throw error;
  }
}


    // original faulty shortlisted property count
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
        $unwind: '$propertyDetails',
      },
      {
        $lookup: {
          from: 'sharedproperties',
          localField: 'sharedProperty',
          foreignField: '_id',
          as: 'sharedProperty',
        },
      },
      {
        $unwind: '$sharedProperty',
      },
      {
        $match: {
           'propertyDetails.agentId': agentId,
           'sharedProperty.isShortlisted': true,
           $expr: {
            $in: ['$_id', '$sharedProperty.shortlistedProperties'],
          },

        },
      },
      {
        $group: {
          _id: '$sharedProperty',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
      _id: 0,
      result: {
        $cond: {
          if: { $gt: ['$count', 0] }, // If count is greater than 0
          then: 1,
          else: 0,
        },
      },
    },
  },
]);
    const Shorlisted_Count = await step4(agentId);
    console.log('Shortlisted Count', Shorlisted_Count);
    const sharedPropertiesNumber = (await sharedProperties(agentId)).length;
    // const yetToShareNumber = (await yetToShareNo(agentId)).size;
    // console.log('Shared Properties', (await sharedPropertiesNo(agentId)).size);
    // console.log('Yet to Share', (await yetToShareNo(agentId)).size)

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
    output.Shared = sharedPropertiesNumber ? sharedPropertiesNumber : 0;
    output.YetToShare = newObj.Verified - output.Shared ? newObj.Verified - output.Shared : 0;
    output.Shortlisted = Shorlisted_Count;
    output = { ...output, ...newObj };
    return successResponse(
      res,
      200,
      { counts: output },
      'Property dashboard count fetched successfully.'
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

function daysAgo(date) {
  const now = new Date();
  const differenceInMs = now.getTime() - date.getTime();
  const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  return days;
}

export const propertyViewingStatus = async (req: Request, res: Response) => {
  try{
    const propertyId = req.params.id;
    const agentId = req.body.agentId;
    // const boards = await Board.find({agentId});

    let tenantDetails = [];
    let tenantStatus = [];
    let shortListedDate = [];
    let viewedDate = [];

    const pipeline = [
      {
        $match: {
          agentId: agentId,
          // propertyId: { $in: [propertyId] }
        }
      }
    ];

    const boards = await Board.find({agentId}).populate('tenantId')
    boards.forEach((board) => {
      board.propertyId.forEach((property) => {
        if(property.toString() === propertyId){
          tenantDetails.push(board.tenantId)
          tenantStatus.push(board.tenantId.status)
          
          const shortlistedAt = board.shortlistedDate.get(propertyId) ? board.shortlistedDate.get(propertyId): null;
          const viewedAt = board.lastVisitedAt.get(propertyId) ? board.lastVisitedAt.get(propertyId): null;
          if (shortlistedAt !== null) shortListedDate.push(daysAgo(shortlistedAt));
          else shortListedDate.push(-1);
          if (viewedAt !== null) viewedDate.push(daysAgo(viewedAt));
          else viewedDate.push(-1);

        }
      })
    })
    
    const result = {tenantDetails, tenantStatus, shortListedDate, viewedDate};

    return successResponse(
      res,
      200,
      result,
      'Property status updated successfully.'
    );
  }
  catch(error){
    console.log(error);
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
}

// Edit property status with close listing property
export const closeListingProperty = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    const id = new Types.ObjectId(req.params.id);
    Property.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          closeListingReason: tempData.closeListingReason,
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
          updatedRecord.propertyDetails = [
            updatedRecord.propertyDetails[
              updatedRecord.propertyDetails.length - 1
            ],
          ];
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
export const getPropertyImagesFromS3Final = async (req: Request, res: Response) => {
  try {
    const images = await getS3ImagesFromFinalFolder(req.params.id);
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

export const getPropertyImagesFromS3Raw = async (req: Request, res: Response) => {
  try {
    const images = await getS3ImagesByPropertyIdRaw(req.params.id);
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
    let imgs: any = [];
    imgs = await copyAndRenameS3Images(propertyId, req.body.images);
    // console.log('imgs', imgs);
    const sortedImgs = await imgs.sort(imageRankingSort);
    if (imgs && imgs.length) {
      Property.findByIdAndUpdate(
        { _id: propertyId },
        {
          $set: {
            imagesApproved: true,
          },
          $addToSet: {
            images: sortedImgs,
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

function imageRankingSort(a, b) {
  const regex = /(\d+)\.PNG$/; // Regular expression to match the digits before ".PNG"
  const aMatch = a.match(regex);
  const bMatch = b.match(regex);
  if (aMatch && bMatch) {
    const aNumber = parseInt(aMatch[1], 10);
    const bNumber = parseInt(bMatch[1], 10);
    return aNumber - bNumber;
  }
  // If matching digits aren't found, maintain the original order
  return 0;
}

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
          updatedRecord.propertyDetails = [
            updatedRecord.propertyDetails[
              updatedRecord.propertyDetails.length - 1
            ],
          ];
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

export const addImages = async (req: Request, res: Response) => {
  try{
    const propertyId = req.params.id;
    const images = req.body;

    let imagesByRank: string[] = [];

    Object.entries(images).forEach(([link, position]: [string, number]) => {
      imagesByRank[position-1] = link;
    })
    console.log(imagesByRank);
    console.log(propertyId);
    const property = await Property.findByIdAndUpdate(propertyId, {
      $set: {
        images: imagesByRank
      },
    });
    
    return successResponse(
      res,
      200,
      'Images Added Successfully by Rank'
    );
  }
  catch(error){
    console.log(error);
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
}

export const getPropertiesForAgent = async (req: Request, res: Response) => {
  try {
    // It search based on houseName of property
    const searchText: any = req.query.search;
    // It filters based on status of property like New/Pending/Verified/Closed and also for archive filter of closeListingReason
    const filter: any = req.query.filter;
    const imagesApproved = req.query.imagesApproved;
    const agentId = new Types.ObjectId(req.params.id);

    let aggregationPipeline: PipelineStage[] = [
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
      filter.trim().toLowerCase() !== 'shortlisted' &&
      filter.trim().toLowerCase() !== 'shared'
    ) {
      aggregationPipeline.push({
        $match: {
          $or: [
            {
              status: {
                $regex: new RegExp('^' + filter.trim().toLowerCase(), 'i'),
              },
            },
            {
              closeListingReason: {
                $regex: new RegExp('^' + filter.trim().toLowerCase(), 'i'),
              },
            },
          ],
        },
      });
    }

    if (filter && filter.trim() && filter.trim().toLowerCase() === 'shared') {
      aggregationPipeline.push({
        $match: {
          $expr: {
            $or: [
              { $gt: [{ $size: '$sharedProperty' }, 0] },
              { $gt: [{ $size: '$sharedBuyerProperty' }, 0] },
            ],
          },
        },
      });
    }

    if (
      filter &&
      filter.trim() &&
      filter.trim().toLowerCase() === 'shortlisted'
    ) {
      aggregationPipeline = aggregationPipeline.concat([
        {
          $lookup: {
            from: 'sharedbuyerproperties',
            localField: 'sharedBuyerProperty',
            foreignField: '_id',
            as: 'sharedBuyerProperty',
          },
        },
        {
          $lookup: {
            from: 'sharedproperties',
            localField: 'sharedProperty',
            foreignField: '_id',
            as: 'sharedProperty',
          },
        },
        {
          $match: {
            $or: [
              { 'sharedProperty.isShortlisted': true },
              { 'sharedBuyerProperty.isShortlisted': true },
            ],
          },
        },
      ]);
    }

    if (imagesApproved === 'false') {
      aggregationPipeline.push({ $match: { imagesApproved: false } });
    }
    if (imagesApproved === 'true') {
      aggregationPipeline.push({ $match: { imagesApproved: true } });
    }

    const properties = await Property.aggregate(aggregationPipeline);
    if (properties && properties.length) {
      properties.map(
        (x) =>
          (x.propertyDetails = x.propertyDetails[x.propertyDetails.length - 1])
      );
    }
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

export const sharedPropertiesList = async (req: Request, res: Response) => {
  try {
    console.log('1');
    // const temp = req.params.id;
    const agentId = req.user.user._id;
    // const agentId = new Types.ObjectId(req.user.user._id);
    const boards = await Board.find({agentId});
    let sharedProperties = new Set()
    let propertyArray = [];
    boards.forEach((board) => {
      board.propertyId.forEach((property) => {
        const propertyId = property.toString()
        var length = sharedProperties.size;
        sharedProperties.add(propertyId);
        if(length < sharedProperties.size)
          propertyArray.push(property)
      });
    })  
    const result = await Property.find({ _id: { $in: propertyArray } });
    return successResponse(
      res,
      200,
      result,
      'Properties found successfully.'
    );
  } catch (error) {
    console.log(error);
    console.log('1');
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
}

export const shortlistedPropertiesList = async (req: Request, res: Response) => {
  try {
    const agentId = req.user.user._id;
    const boards = await Board.find({agentId});

    const distinctPropertyIds = new Set();
    boards.forEach((board) => {
      board.isShortlisted.forEach((value, key) => {
        if (value === true) { distinctPropertyIds.add(key); }
      });
    });
    const propertyArray = [...distinctPropertyIds]
    const result = await Property.find({ _id: { $in: propertyArray } });
    return successResponse(
      res,
      200,
      result,
      'Properties found successfully.'
    );
  } catch (error) {
    console.log(error);
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
}
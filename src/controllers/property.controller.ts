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
    tempData.propertyData.agentId = new Types.ObjectId(
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
            x.agentId.equals(tempData.propertyData.agentId)
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
  try {
    const userId = new Types.ObjectId(req.user.user._id);
    console.log('userID', userId);

    // shared count
    const step1 = await Property.countDocuments({
      $expr: { $gt: [{ $size: '$sharedProperty' }, 0] },
    });

    // shared count
    const step2 = await Property.countDocuments({
      $expr: { $eq: [{ $size: '$sharedProperty' }, 0] },
    });

    // shared count
    const step3 = await Property.aggregate([
      {
        $lookup: {
          from: 'sharedproperties',
          localField: 'sharedProperty',
          foreignField: '_id',
          as: 'sharedPropertyInfo'
        }
      },
      {
        $project: {
          _id: 1,
          count: {
            $size: {
              $filter: {
                input: '$sharedPropertyInfo',
                as: 'sp',
                cond: { $eq: ['$$sp.isShortlisted', true] }
              }
            }
          }
        }
      },
      {
        $project: {
          count: { $size: '$sharedPropertyInfo' } // Count the elements in the array
        }
      },
      // {
      //   $match: {
      //     count: { $gt: 0 }
      //   }
      // }
      // {
      //   $match: {
      //     count: { $gt: 0 }
      //   }
      // },
      // {
      //   $group: {
      //     _id: 0,
      //     count: { $size: 1 }
      //   }
      // }
      // {
      //   $addFields: {
      //     hasShortlisted: {
      //       $anyElementTrue: {
      //         $map: {
      //           input: '$sharedPropertyInfo',
      //           as: 'sp',
      //           in: '$$sp.isShortlisted'
      //         }
      //       }
      //     }
      //   }
      // },
      // {
      //   $group: {
      //     _id: '$_id',
      //     count: { $sum: { $cond: [{ $eq: ['$hasShortlisted', true] }, 1, 0] } }
      //   }
      // }
      // {
      //   $lookup: {
      //     from: 'sharedproperty',
      //     localField: 'sharedProperty',
      //     foreignField: '_id',
      //     as: 'sharedPropertyInfo',
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'sharedproperties',
      //     let: { sharedPropertyIds: { $ifNull: ['$sharedproperties', []] } },
      //     // let: { sharedPropertyIds: '$sharedproperties' },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: {
      //             $and: [
      //               { $in: ['$_id', '$$sharedPropertyIds'] },
      //               { $eq: ['$isShortlisted', true] }
      //             ]
      //           }
      //         }
      //       }
      //     ],
      //     as: 'shortlistedSharedProperties'
      //   }
      // },
      // {
      //   $project: {
      //     _id: 1,
      //     count: { $size: '$shortlistedSharedProperties' }
      //   }
      // }
      // {
      //   $match: {
      //     'shortListProperties.isShortlisted': true
      //   }
      // },
      // {
      //   $group: {
      //     _id: null,
      //     count: { $sum: 1 }
      //   }
      // }
    //   {
    //     $addFields: {
    //         hasShortlistedSharedProperty: {
    //             $anyElementTrue: '$sharedProperties.isShortlisted'
    //         }
    //     }
    // },

    // {
    //     $match: {
    //       '$sharedProperties.isShortlisted': true,
    //       count: { $sum: 1 },
    //     },
    // },

    //   {
      //     $unwind: {
      //         path: '$shortListProperties',
      //         preserveNullAndEmptyArrays: true
      //     }
      // },

    ]);

    console.log('step3 : ', step3);

    // const aggregateQuery = await Property.aggregate([
    //   {
    //     $group: {
    //       _id: { $size: '$sharedProperty' }, // Group by the length of the "data" array
    //       new2: {
    //         $sum: {
    //           $cond: [{ $gt: [{ $size: '$sharedProperty' }, 0] }, 1, 0],
    //         },
    //       },
    //     },
    //   },
    // ]);

    // const aggregateQuery = await Property.aggregate([
    //     {
    //       $lookup: {
    //         from: 'sharedproperty',
    //         localField: 'sharedProperty',
    //         foreignField: '_id',
    //         as: 'sharedProperties'
    //       }
    //     },
    //     {
    //       $project: {
    //         _id: 1,
    //         hasSharedProperty: { $gt: [{ $size: '$sharedProperties' }, 0] },
    //         hasShortlistedSharedProperty: {
    //           $anyElementTrue: {
    //             $map: {
    //               input: '$sharedProperties',
    //               as: 'sharedProp',
    //               in: '$$sharedProp.isShortlisted'
    //             }
    //           }
    //         },
    //         sharedPropertyCount: { $size: '$sharedProperties' }
    //       }
    //     },
    //     {
    //       $group: {
    //         _id: null,
    //         propertiesWithNoSharedProperty: {
    //           $sum: {
    //             $cond: [{ $eq: ['$sharedPropertyCount', 0] }, 1, 0]
    //           }
    //         },
    //         propertiesWithSharedProperty: {
    //           $sum: {
    //             $cond: [{ $gt: ['$sharedPropertyCount', 0] }, 1, 0]
    //           }
    //         },
    //         propertiesWithShortlistedSharedProperty: {
    //           $sum: {
    //             $cond: ['$hasShortlistedSharedProperty', 1, 0]
    //           }
    //         }
    //       }
    //     },
    //     {
    //       $project: {
    //         _id: 0,
    //         propertiesWithNoSharedProperty: 1,
    //         propertiesWithSharedProperty: 1,
    //         propertiesWithShortlistedSharedProperty: 1
    //       }
    //     }
    //   ]);

    // console.log('aggregateQuery result ', aggregateQuery);
    // const property = aggregateQuery.reduce((obj, item) => {
    //   obj[item.status] = item.count;
    //   return obj;
    // }, {});

    // return successResponse(
    //   res,
    //   200,
    //   { property },
    //   'Property dashboard count get successfully.'
    // );
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

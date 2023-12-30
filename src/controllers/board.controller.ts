import { Request, Response } from 'express';
import {
  successResponse,
  failureResponse,
} from '../helpers/api-response.helper';
import Board from '../models/board.model';
import Property from '../models/property.model';
import Tenant from '../models/tenant.model';
import Buyer from '../models/buyer.model';
import SharedProperty from '../models/sharedProperty.model';
import { sharedPropertyInfo } from '../models/sharedProperty.model';
import SharedBuyerProperty from '../models/sharedBuyerProperty.model';
import { Types } from 'mongoose';
import { generateRandomKey } from '../services/crypto.service';
import { changeTenantStatus } from './tenant.controller';
import { changeBuyerStatus } from './buyer.controller';

export const addBoard = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    const existingBoard = await Board.findOne({ tenantId: tempData.tenantId });

    if (existingBoard) {
      // Update existing board data here
      existingBoard.someField = tempData.someField; // Replace with actual field updates
      // Save the changes
      const updatedBoard = await existingBoard.save();

      return successResponse(
        res,
        200,
        { board: updatedBoard },
        'Board data updated successfully.'
      );
    } else {
      // Create a new board
      if (!tempData.tenantId) {
        tempData.boardFor = 'Buyer';
      } else {
        tempData.boardFor = 'Tenant';
      }
      tempData.agentId = new Types.ObjectId(req.user.user._id);
      tempData.key = await generateRandomKey(12);
      const detailObj: any = new Board(tempData);
      const savedRecord: any = await detailObj.save();
      await savedRecord.populate({
        path: 'propertyId',
        populate: { path: 'propertyDetails' },
      });
      await savedRecord.populate({
        path: 'tenantId',
        populate: { path: 'tenantDetails' },
      });
      await savedRecord.populate({
        path: 'buyerId',
        populate: { path: 'buyerDetails' },
      });
      if (savedRecord && savedRecord.propertyId && savedRecord.propertyId.length) {
        savedRecord.propertyId.map((x) => (x.propertyDetails = [x.propertyDetails[x.propertyDetails.length - 1]]));
      }
      const flagChanged = await changeFlag(savedRecord);
      if (savedRecord && savedRecord.boardFor && savedRecord.boardFor === 'Tenant') {
        savedRecord.tenantId.isOnBoard = true;
        savedRecord.tenantId.boardId = savedRecord._id;
      } else if (savedRecord && savedRecord.boardFor && savedRecord.boardFor === 'Buyer') {
        savedRecord.buyerId.isOnBoard = true;
        savedRecord.buyerId.boardId = savedRecord._id;
      }

      return successResponse(
        res,
        200,
        { board: savedRecord },
        'New board created successfully.'
      );
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

const changeFlag = async (data) => {
  try {
    if (data && data.boardFor && data.boardFor === 'Tenant') {
      await Tenant.findByIdAndUpdate(data.tenantId, {
        $set: { isOnBoard: true, boardId: data._id },
      });
    } else if (data && data.boardFor && data.boardFor === 'Buyer') {
      await Buyer.findByIdAndUpdate(data.buyerId, {
        $set: { isOnBoard: true, boardId: data._id },
      });
    }
  } catch (error) {
    return failureResponse(
      {},
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Add property in board by property agent
export const addPropertyInBoard = async (req: Request, res: Response) => {
  const board = await Board.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { propertyId: req.body.propertyId } },
    { new: true }
  ).populate({ path: 'propertyId', populate: { path: 'propertyDetails' } });
  if (!board) {
    return failureResponse(res, 404, [], 'Board not found.');
  }
  if (board && board.propertyId && board.propertyId.length) {
    board.propertyId.map((x) => x.propertyDetails = [x.propertyDetails[x.propertyDetails.length - 1]]);
  }
  console.log(board);
  return successResponse(
    res,
    200,
    { board },
    'Property added to board successfully.'
  );
};

// Update viewedAt Date while view property
export const updatePropertyViewAtDate = async (req: Request, res: Response) => {
  try {
    console.log('req.pparams', req.params, req.user, req.body);
    const propertyId = req.body.propertyId;
    const tenantID = req.user.user._id;
    const board = await Board.findById(req.params.id)
      .populate('tenantId propertyId buyerId')
      .lean();
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    const update = updateViewedAtDate(board, propertyId, tenantID);
    console.log('updated record', update);
    return successResponse(
      res,
      200,
      { },
      'Property viewed date added successfully.'
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

const updateViewedAtDate = async (data, propertyId, tenantID) => {
  try {
    if (data && data.propertyId && data.propertyId.length) {
      if (data && data.boardFor && data.boardFor === 'Tenant') {
        return await Promise.all(
          data.propertyId.map(async (singleProperty) => {
            if (
              singleProperty._id === propertyId &&
              singleProperty.sharedProperty &&
              singleProperty.sharedProperty.length
            ) {
              return await SharedProperty.updateMany(
                {
                  tenantId: tenantID,
                  _id: { $in: singleProperty.sharedProperty },
                },
                { $set: { viewedAt: Date.now() } }
              );
            }
          })
        );
      } else if (data && data.boardFor && data.boardFor === 'Buyer') {
        return await Promise.all(
          data.propertyId.map(async (singleProperty) => {
            if (
              singleProperty._id.toString() === propertyId &&
              singleProperty.sharedBuyerProperty &&
              singleProperty.sharedBuyerProperty.length
            ) {
              return await SharedBuyerProperty.updateMany(
                {
                  buyerId: tenantID,
                  _id: { $in: singleProperty.sharedBuyerProperty },
                },
                { $set: { viewedAt: Date.now() } }
              );
            }
          })
        );
      }
    }
  } catch (error) {
    return failureResponse(
      {},
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Find board by board id
export const getBoardById = async (req: Request, res: Response) => {
  try {
    const board = await Board.findById(req.params.id)
    .populate({ path: 'propertyId', populate: { path: 'propertyDetails' } })
    .populate({ path: 'tenantId', populate: { path: 'tenantDetails' } })
    .populate({ path: 'buyerId', populate: { path: 'buyerDetails' } })
    .lean();
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    if (board && board.tenantId) {
      board.tenantId.tenantDetails = [board.tenantId.tenantDetails[board.tenantId.tenantDetails.length - 1]];
    }
    if (board && board.buyerId) {
      board.buyerId.buyerDetails = [board.buyerId.buyerDetails[board.buyerId.buyerDetails.length - 1]];
    }
    if (board && board.propertyId && board.propertyId.length) {
      board.propertyId.map(
        (x) =>
          (x.propertyDetails = x.propertyDetails[x.propertyDetails.length - 1])
      );
      // board.propertyId.propertyDetails = [board.propertyId.propertyDetails[board.propertyId.propertyDetails.length - 1]];
    }
    return successResponse(res, 200, { board }, 'Board get successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Find board details by board id
export const getBoardDetailsById = async (req: Request, res: Response) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate({ path: 'propertyId', populate: { path: 'propertyDetails' } })
      .populate({ path: 'tenantId', populate: { path: 'tenantDetails' } })
      .populate({ path: 'buyerId', populate: { path: 'buyerDetails' } })
      .lean();
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    if (board && board.tenantId) {
      board.tenantId.tenantDetails = [board.tenantId.tenantDetails[board.tenantId.tenantDetails.length - 1]];
    }
    if (board && board.buyerId) {
      board.buyerId.buyerDetails = [board.buyerId.buyerDetails[board.buyerId.buyerDetails.length - 1]];
    }
    if (board && board.propertyId && board.propertyId.length) {
      board.propertyId = board.propertyId.length;
    }
    return successResponse(
      res,
      200,
      { board },
      'Board details get successfully.'
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

// Finalize board by property agent
export const finalizeBoard = async (req: Request, res: Response) => {
  try {
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      {
        $set: { status: true, shareBoardLink: req.body.shareBoardLink },
      },
      { new: true }
    )
      .populate('tenantId buyerId propertyId')
      .lean();
    updateSharedPropertyTable(board);
    // sharedPropertyTable(board);
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    console.log('finalized');
    // const update = updateSharedDate(board);
    return successResponse(res, 200, { }, 'Board finalized successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};
const sharedPropertyTable = async (board) => {
  try {
    // Find or create a SharedProperty object with the given tenantId
    const sharedProperty = await SharedProperty.findOneAndUpdate(
      { tenantId: board.tenantId },
      { upsert: true, new: true }
    );

    // Update the sharedProperties array in the Property model for each propertyId
    await Promise.all(board.propertyId.map(async (propertyId) => {
      console.log(propertyId._id);
      await Property.findByIdAndUpdate(
        propertyId._id,
        { $push: { sharedProperty: sharedProperty._id } },
        { upsert: true, new: true }
      );
    }));

    console.log('Shared Property Table updated successfully!');
  } catch (error) {
    console.error('Error updating Shared Property Table:', error);
  }
};


const updateSharedPropertyTablee = async (data) => {
  console.log('data while update', data);
  if (data && data.boardFor && data.boardFor === 'Tenant') {
    await Promise.all(
      data.propertyId.map(async (singleProperty) => {
        // Check if a SharedProperty with the same tenantId already exists
        const existingProperty = await SharedProperty.findOne({ tenantId: data.tenantId });
        if (!existingProperty) {
          const obj = {
            tenantId: data.tenantId,
         };
          const detailObj = new SharedProperty(obj);
          const savedObj = await detailObj.save();
          Property.findByIdAndUpdate(
            singleProperty._id,
            { $push: { sharedProperty: savedObj._id } },
            { new: true }
          ).exec((err, updatedValue) => {
            if (err) {
              return failureResponse(err, 404, [], 'Board not found.');
            }
            console.log('Add ho gaya ');
            return updatedValue;
          });
        } else {
          // If it already exists, use the existing one
          Property.findByIdAndUpdate(
            singleProperty._id,
            { $push: { sharedProperty: existingProperty._id } },
            { new: true }
          ).exec((err, updatedValue) => {
            if (err) {
              return failureResponse(err, 404, [], 'Board not found.');
            }
            console.log('Add ho gaya ');
            return updatedValue;
          });
        }
      })
    );
  } else {
    await Promise.all(
      data.propertyId.map(async (singleProperty) => {
        // Check if a SharedBuyerProperty with the same buyerId already exists
        const existingBuyerProperty = await SharedBuyerProperty.findOne({ buyerId: data.buyerId });
        if (!existingBuyerProperty) {
          const obj = {
            buyerId: data.buyerId,
          };
          const detailObj = new SharedBuyerProperty(obj);
          const savedObj = await detailObj.save();
          Property.findByIdAndUpdate(
            singleProperty._id,
            { $push: { sharedBuyerProperty: savedObj._id } },
            { new: true }
          ).exec((err, updatedValue) => {
            if (err) {
              return failureResponse(err, 404, [], 'Board not found.');
            }
            return updatedValue;
          });
        } else {
          // If it already exists, use the existing one
          Property.findByIdAndUpdate(
            singleProperty._id,
            { $push: { sharedBuyerProperty: existingBuyerProperty._id } },
            { new: true }
          ).exec((err, updatedValue) => {
            if (err) {
              return failureResponse(err, 404, [], 'Board not found.');
            }
            return updatedValue;
          });
        }
      })
    );
  }
};


const updateSharedPropertyTable = async (data) => {
  console.log('data while update', data);
  if (data && data.boardFor && data.boardFor === 'Tenant') {
    await Promise.all(
      data.propertyId.map(async (singleProperty) => {
        const obj = {
          tenantId: data.tenantId,
        };
        const detailObj: any = new SharedProperty(obj);
        const savedObj = await detailObj.save();
        Property.findByIdAndUpdate(
          singleProperty._id,
          { $push: { sharedProperty: savedObj._id } },
          { upsert : true , new: true }
        ).exec((err, updatedValue) => {
          if (err) {
            return failureResponse(err, 404, [], 'Board not found.');
          }
         // console.log('Add ho gaya ');
          return updatedValue;

        });
      })
    );
  } else {
    await Promise.all(
      data.propertyId.map(async (singleProperty) => {
        const obj = {
          buyerId: data.buyerId,
        };
        const detailObj: any = new SharedBuyerProperty(obj);
        const savedObj = await detailObj.save();
        Property.findByIdAndUpdate(
          singleProperty._id,
          { $push: { sharedBuyerProperty: savedObj._id } },
          { new: true }
        ).exec((err, updatedValue) => {
          if (err) {
            return failureResponse(err, 404, [], 'Board not found.');
          }
          return updatedValue;
        });
      })
    );
  }
};

// Share board by property agent
export const shareBoard = async (req: Request, res: Response) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate('tenantId buyerId propertyId')
      .lean();
    console.log('board', board);
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    const update = updateSharedDate(board);
    if (board && board.boardFor && board.boardFor === 'Tenant') {
      const status1 = await changeTenantStatus(board.tenantId._id, 'Shared');
    } else if (board && board.boardFor && board.boardFor === 'Buyer') {
      const status2 = await changeBuyerStatus(board.buyerId._id, 'Shared');
    }
    return successResponse(res, 200, { board }, 'Board shared successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

const updateSharedDate = async (data) => {
  try {
    if (data && data.boardFor && data.boardFor === 'Tenant') {
      if (data && data.propertyId && data.propertyId.length) {
        await Promise.all(
          data.propertyId.map(async (singleProperty) => {
            if (
              singleProperty.sharedProperty &&
              singleProperty.sharedProperty.length
            ) {
              return await SharedProperty.updateMany(
                {
                  tenantId: data.tenantId._id,
                  _id: { $in: singleProperty.sharedProperty },
                },
                { $set: { sharedAt: data.updatedAt } }
              );
            }
          })
        );
      }
    } else if (data && data.boardFor && data.boardFor === 'Buyer') {
      if (data && data.propertyId && data.propertyId.length) {
        await Promise.all(
          data.propertyId.map(async (singleProperty) => {
            if (
              singleProperty.sharedBuyerProperty &&
              singleProperty.sharedBuyerProperty.length
            ) {
              return await SharedBuyerProperty.updateMany(
                {
                  buyerId: data.buyerId._id,
                  _id: { $in: singleProperty.sharedBuyerProperty },
                },
                { $set: { sharedAt: data.updatedAt } }
              );
            }
          })
        );
      }
    }
  } catch (error) {
    return failureResponse(
      {},
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Add date while shortlist property
export const shortlistDate = async (req: Request, res: Response) => {
  try {
    const propertyId = req.body.propertyid;
    const shortListStatus =  req.body.shortListStatus;
   // const tenantID = req.user.user._id;
    const tenantID = req.body.globalTenantId;
    console.log('Upper', tenantID);
   // console.log(propertyId, {shortListStatus}, tenantID);
    const board = await Board.findById(req.params.id)
      .populate('tenantId buyerId propertyId')
      .lean();
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    if (board && board.boardFor && board.boardFor === 'Tenant') {
      // const status1 = await changeTenantStatus(tenantID, 'Shortlisted');
      const update1 = await updateShortlistDate(board, propertyId, tenantID, 'Tenant', shortListStatus);
     // const update3 = shortlistProperty(tenantID, propertyId);
    } else if (board && board.boardFor && board.boardFor === 'Buyer') {
      const status2 = await changeBuyerStatus(tenantID, 'Shortlisted');
      const update2 = await updateShortlistDate(
        board,
        propertyId,
        tenantID,
        'Buyer',
        shortListStatus
      );
    }
    if (shortListStatus === true){
    return successResponse(
      res,
      200,
      {},
      'Property shortlisted successfully.'
    );
    }
    else if (shortListStatus === false){
      return successResponse(
        res,
        200,
        {},
        'Property Unshortlisted successfully.'
      );
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

const updateShortlistDate = async (data, propertyId, tenantID, boardFor, shortListStatus) => {
  try {
    // console.log('data', data, propertyId, tenantID);
   // console.log('TenId', tenantID);
   // console.log('Status', shortListStatus);
    if (boardFor === 'Tenant') {
    // const len =  sharedPropertyInfo.shortlistedProperties.length ;

      return await Promise.all(
        data.propertyId.map(async (singleProperty) => {
          if (
            singleProperty._id.toString() === propertyId &&
            singleProperty.sharedProperty &&
            singleProperty.sharedProperty.length
          ) {

            // console.log('id', singleProperty.sharedProperty);
            // console.log('here');
            // console.log('SharedProp', singleProperty.sharedProperty);
            // const existingDocument = await SharedProperty.findOne({ tenantId: tenantID });
            // console.log('Existing Document:', existingDocument);

            if (shortListStatus){
              console.log('yaha');
              await SharedProperty.findOneAndUpdate(
              {
                'sharedProperty.tenantId': tenantID, },
              {$addToSet: {shortlistedProperties: {propertyId}, },
                $set: {shortListedAt: Date.now()},
              },
              { new : true }
              );
             // updateSharedPropertyTablee(data, existingDocument._id);
              console.log('Idhar');
          }
         else if (!shortListStatus){
               await SharedProperty.findOneAndUpdate(
                {

                 _id: { $in: singleProperty.sharedProperty.tenantId === tenantID  },
                },
                {

                  $pull: {
                    shortlistedProperties: {
                      propertyId: {
                        $in: [propertyId],
                        $exists: true
                      }
                    }
                  },
                  $set: {
                    shortListedAt: Date.now(),
                    // isShortlisted: state1,
                 },
                },
                {new : true}
              );

            }
                    ///////////////////// finding length of array part
            const sharedProperty = await SharedProperty.findOne({tenantId: tenantID, });

            const shortlistedPropertiesLength = sharedProperty?.shortlistedProperties.length || 0;
            console.log('LENGTH ____________________',  shortlistedPropertiesLength);
// add here
            if (shortlistedPropertiesLength > 0){
              await Tenant.updateOne(
                { _id: tenantID }, // Assuming _id is the identifier for the Tenant
                { $set: { numberShortlisted: shortlistedPropertiesLength } }
              );
              await changeTenantStatus(tenantID, 'Shortlisted');
              await SharedProperty.updateMany(
  {

      tenantId: tenantID,
     // _id: { $in: singleProperty.sharedProperty },
    },
    {
      $set: {
        // shortListedAt: Date.now(),
        isShortlisted: true,
     },
    }

); }
else {
  await Tenant.updateOne(
    { _id: tenantID },
    { $set: { numberShortlisted: shortlistedPropertiesLength } }
  );
  await changeTenantStatus(tenantID, 'CurrentlyViewing');
  await SharedProperty.updateMany(
    {

        tenantId: tenantID,
       // _id: { $in: singleProperty.sharedProperty },
      },
      {
        $set: {
          // shortListedAt: Date.now(),
          isShortlisted: false,
       },
      }

  );
}
          }
        })
      );

    } else if (boardFor === 'Buyer') {
      return await Promise.all(
        data.propertyId.map(async (singleProperty) => {
          if (
            singleProperty._id.toString() === propertyId &&
            singleProperty.sharedBuyerProperty &&
            singleProperty.sharedBuyerProperty.length
          ) {
            return await SharedBuyerProperty.updateMany(
              {
                buyerId: tenantID,
                _id: { $in: singleProperty.sharedBuyerProperty },
              },
              {
                $set: {
                  shortListedAt: Date.now(),
                  isShortlisted: true
                },
                $addToSet: {
                  shortlistedProperties: {
                    [propertyId]: {
                      shortListStatus,
                    },
                  },
                },
              },
              { upsert: true } // for making changes
            );
          }
        })
      );
    }
  } catch (error) {
    return failureResponse(
      {},
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

const shortlistProperty = async (tenantId, propertyId) => {
  try {
    // Find the document with the provided tenantId
    const existingDocument = await SharedProperty.findOne({ tenantId });

    if (!existingDocument) {
      console.log('Document not found for tenantId:', tenantId);
      return;
    }

    // Ensure that shortlistedProperties is an array
    if (!Array.isArray(existingDocument.shortlistedProperties)) {
      existingDocument.shortlistedProperties = [];
    }

    // Add propertyId to the shortlistedProperties array
    existingDocument.shortlistedProperties.push({ propertyId });

    // Save the changes
    await existingDocument.save();

    console.log('Property shortlisted successfully!');
  } catch (error) {
    console.error('Error during shortlisting property:', error);
  }
};

// Update last visited date of tenant board
export const updateLastVisitDateTenantBoard = async (
  req: Request,
  res: Response
) => {
  try {
    const boards = await Board.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user.user._id },
      {
        $set: { lastVisitedAt: Date.now() },
      },
      { new: true }
    );
    if (!boards) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    return successResponse(res, 200, {  }, 'Date updated successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Update last visited date of buyer board
export const updateLastVisitDateBuyerBoard = async (
  req: Request,
  res: Response
) => {
  try {
    const boards = await Board.findOneAndUpdate(
      { _id: req.params.id, buyerId: req.user.user._id },
      {
        $set: { lastVisitedAt: Date.now() },
      },
      { new: true }
    );
    if (!boards) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    return successResponse(res, 200, { boards }, 'Date updated successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

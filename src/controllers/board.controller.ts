import { Request, Response } from 'express';
import {successResponse, failureResponse, } from '../helpers/api-response.helper';
import Board from '../models/board.model';
import Property from '../models/property.model';
import Tenant from '../models/tenant.model';
import Buyer from '../models/buyer.model';
import SharedProperty from '../models/sharedProperty.model';
import SharedBuyerProperty from '../models/sharedBuyerProperty.model';
import { Types } from 'mongoose';
import { generateRandomKey } from '../services/crypto.service';
import { changeTenantStatus } from './tenant.controller';
import { changeBuyerStatus } from './buyer.controller';

export const addBoard = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
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
      savedRecord.propertyId.map((x) => x.propertyDetails = [x.propertyDetails[x.propertyDetails.length - 1]]);
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
  try {
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { propertyId: { $nin: req.body.propertyId } },
      },
      { new: true }
    );

    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }

    // Now add new properties
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { propertyId: { $each: req.body.propertyId } },
      },
      { new: true }
    ).populate({ path: 'propertyId', populate: { path: 'propertyDetails' } });

    if (updatedBoard && updatedBoard.propertyId && updatedBoard.propertyId.length) {
      updatedBoard.propertyId.forEach((property) => {
        property.propertyDetails = [property.propertyDetails[property.propertyDetails.length - 1]];
      });
    }

    console.log(updatedBoard);
    return successResponse(
      res,
      200,
      { board: updatedBoard },
      'Properties added and removed from board successfully.'
    );
  } catch (error) {
    console.error(error);
    return failureResponse(res, 500, [], 'Internal Server Error');
  }
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
    // if (data && data.propertyId && data.propertyId.length) {
      const ID = data._id;
      if (data && data.boardFor && data.boardFor === 'Tenant') {
        data.lastVisitedAt[propertyId] = Date.now();
        return await Board.findOneAndUpdate({_id: ID}, data);
        // return await Board.findOneAndUpdate(
        //   { _id: ID }, { $set: { lastVistedAt: updatedVisitedMap} }
        // );
        // return await Promise.all(
        //   data.propertyId.map(async (singleProperty) => {
        //     if (
        //       singleProperty._id === propertyId &&
        //       singleProperty.sharedProperty &&
        //       singleProperty.sharedProperty.length
        //     ) {
        //       return await SharedProperty.updateMany(
        //         {
        //           tenantId: tenantID,
        //           _id: { $in: singleProperty.sharedProperty },
        //         },
        //         { $set: { viewedAt: Date.now() } }
        //       );
        //     }
        //   })
        // );

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
  // }
   catch (error) {
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

export const updateBoard = async (req: Request, res: Response) => {
  try {
    const boards = await Board.find();

    for (const board of boards) {

      const boardRes = await Board.findByIdAndUpdate(
        { _id: board._id },
        { $set: { shortlistedDate: {}, isShortlisted: {}, sharedAt: {}, lastVisitedAt: {} } }
      );

    }

    console.log('Migration completed successfully');
    return successResponse(
      res,
      200,
      'Board updated successfully.'
    );
  } catch (error) {
    console.error('Migration failed:', error);
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
    console.log(req.body);

    const board = await Board.findByIdAndUpdate(
      req.params.id,
      {
        $set: { status: true, shareBoardLink: req.body.shareBoardLink },
      },
      { new: true }
    )
      .populate('tenantId buyerId propertyId')
      .lean();
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


const updateSharedProperty = async (propertyId, sharedPropertyId) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      { $addToSet: { sharedProperty: sharedPropertyId } },
      { new: true }
    );

    if (!updatedProperty) {
      console.error('Property not found for propertyId:', propertyId);
      return null;
    }
    console.log('Shared Property updated successfully:', updatedProperty);
    return updatedProperty;
  } catch (error) {
    console.error('Error updating Shared Property:', error);
    throw error;
  }
};

const updateSharedBuyerProperty = async (propertyId, sharedBuyerPropertyId) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      { $addToSet: { sharedBuyerProperty: sharedBuyerPropertyId } },
      { new: true }
    );

    if (!updatedProperty) {
      console.error('Property not found for propertyId:', propertyId);
      return null;
    }
    console.log('Shared Property updated successfully:', updatedProperty);
    return updatedProperty;
  } catch (error) {
    console.error('Error updating Shared Property:', error);
    throw error;
  }
};




// original function for making new entry in sharedProperty
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
    const PropertiesinBoardLength = board?.propertyId.length || 0;
    console.log('PropertiesBoardLength', PropertiesinBoardLength);
    console.log('board', board);
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    const update = updateSharedDate(board);
    if (board && board.boardFor && board.boardFor === 'Tenant') {
      const tenantId = board.tenantId._id;
      const status1 = await changeTenantStatus(board.tenantId._id, 'Shared');
      const status3 = await Tenant.updateOne(
        { _id: tenantId },
        { $set: { numberShared: PropertiesinBoardLength } }
      );

    } else if (board && board.boardFor && board.boardFor === 'Buyer') {
      const buyerId = board.buyerId._id;
      const status2 = await changeBuyerStatus(board.buyerId._id, 'Shared');
      const status3 = await Buyer.updateOne(
        { _id: buyerId },
        { $set: { numberShared: PropertiesinBoardLength } }
      );
    }
    return successResponse(res, 200, { board }, 'Board shared successfully.');
  } catch (error) {
    console.log('h1');
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

const updateSharedDate = async (data) => {
  const ID = data._id;
  try {
    if (data && data.boardFor && data.boardFor === 'Tenant') {
      data.propertyId.map((x) => {
        data.sharedAt[x._id] = Date.now();
      });
      await Board.findOneAndUpdate(
        {_id: ID}, data
      );
      // if (data && data.propertyId && data.propertyId.length) {
        // await Promise.all(
        //   data.propertyId.map(async (singleProperty) => {
        //     console.log('4');
        //     console.log(singleProperty.sharedProperty);
        //     console.log(data._id);
        //     if (
        //       singleProperty.sharedProperty &&
        //       singleProperty.sharedProperty.length
        //     ) {
        //       console.log('5');
        //       console.log(data._id);
        //       console.log(data.tenantId._id);


        //       return await Board.updateOne(

        //           { _id: ID },
        //         //   tenantId: data.tenantId._id,
        //         //   _id: { $in: singleProperty.sharedProperty },
        //         // },
        //         { $set: { sharedAt: data.updatedAt } }
        //       );
        //     }
        //   })
        // );

      // }
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
    const tenantBuyerID = req.body.globalTenantId;
    const board = await Board.findById(req.params.id)
      .populate('tenantId buyerId propertyId')
      .lean();
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    if (board && board.boardFor && board.boardFor === 'Tenant') {
      const update1 = await updateShortlistDate(board, propertyId, tenantBuyerID, 'Tenant', shortListStatus);
    } else if (board && board.boardFor && board.boardFor === 'Buyer') {
      const update2 = await updateShortlistDate(board, propertyId, tenantBuyerID, 'Buyer', shortListStatus);
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
// function governing shortlist
const updateShortlistDate = async (data, propertyId, ID, boardFor, shortListStatus) => {
  try {
if (boardFor === 'Tenant') {
  if (data.isShortlisted){
    data.isShortlisted[propertyId] = shortListStatus;
  }
  if (data.shortlistedDate && shortListStatus) {
    data.shortlistedDate[propertyId] = Date.now();
  }
  else if (data.shortlistedDate && !shortListStatus) {
    data.shortlistedDate[propertyId] = null;
 }


  const res = await Board.findOneAndUpdate(
    {_id: data._id},
    data
  );

  let shortlistedNo = 0;
  data.propertyId.map((x) => {
    if (data.isShortlisted[x._id] === true){
      shortlistedNo++;
    }
  });

  await Tenant.updateOne(
    { _id: ID },
    { $set: { numberShortlisted: shortlistedNo }}
  );

  if (shortlistedNo > 0){
    return await changeTenantStatus(ID, 'Shortlisted');
  }
  else{
    return await changeTenantStatus(ID, 'CurrentlyViewing');
  }



    // return await Promise.all(
    //     data.propertyId.map(async (singleProperty) => {
    //       if (
    //         singleProperty._id.toString() === propertyId
    //       ) {
    //         if (shortListStatus){
    //           const updatedSharedProperty = await SharedProperty.findOneAndUpdate(
    //           {tenantId: ID, },
    //           {$addToSet: {shortlistedProperties: {propertyId}, },
    //             $set: {shortListedAt: Date.now()},
    //           },
    //           {upsert : true, new : true }
    //           );
    //           updateSharedProperty(propertyId, updatedSharedProperty._id);
    //       }
    //      else if (!shortListStatus){
    //            await SharedProperty.findOneAndUpdate(
    //             {tenantId: ID, },
    //             {$pull: {
    //                 shortlistedProperties: {
    //                   propertyId: {
    //                     $in: [propertyId],
    //                     $exists: true
    //                   }
    //                 }
    //               },
    //               $set: {
    //                 shortListedAt: Date.now(),

    //              },
    //             },
    //             {new : true}
    //           );

    //         }
    //         const sharedProperty = await SharedProperty.findOne({tenantId: ID, });
    //         const shortlistedPropertiesLength = sharedProperty?.shortlistedProperties.length || 0;

    //         if (shortlistedPropertiesLength > 0){
    //           await Tenant.updateOne(
    //             { _id: ID },
    //             { $set: { numberShortlisted: shortlistedPropertiesLength } }
    //           );
    //           await changeTenantStatus(ID, 'Shortlisted');
    //           await SharedProperty.updateMany(
    //     {tenantId: ID, },
    //     {$set: {isShortlisted: true, }});
    //    }
    //     else {
    //       await Tenant.updateOne(
    //         { _id: ID },
    //         { $set: { numberShortlisted: shortlistedPropertiesLength } }
    //       );
    //       await changeTenantStatus(ID, 'CurrentlyViewing');
    //       await SharedProperty.updateMany(
    //         {tenantId: ID, },
    //         {$set: {isShortlisted: false, }, });
    //      }}}));
    // updated
    }
    else if (boardFor === 'Buyer') {
      console.log('HERE');
      return await Promise.all(
        data.propertyId.map(async (singleProperty) => {
          if (
            singleProperty._id.toString() === propertyId
          ) {
            if (shortListStatus){
              console.log('HERE also');
              const updatedSharedBuyerProperty = await SharedBuyerProperty.findOneAndUpdate(
              {buyerId: ID, },
              {$addToSet: {shortlistedProperties: {propertyId}, },
                $set: {shortListedAt: Date.now()},
              },
              {upsert : true, new : true }
              );
              updateSharedBuyerProperty(propertyId, updatedSharedBuyerProperty._id);
          }
         else if (!shortListStatus){
               await SharedBuyerProperty.findOneAndUpdate(
                {buyerId: ID, },
                {$pull: {
                    shortlistedProperties: {
                      propertyId: {
                        $in: [propertyId],
                        $exists: true
                      }
                    }
                  },
                  $set: {
                    shortListedAt: Date.now(),

                 },
                },
                {new : true}
              );

            }
            const sharedbuyerProperty = await SharedBuyerProperty.findOne({buyerId: ID, });
            const shortlistedPropertiesLength = sharedbuyerProperty?.shortlistedProperties.length || 0;

            if (shortlistedPropertiesLength > 0){
              await Buyer.updateOne(
                { _id: ID },
                { $set: { numberShortlisted: shortlistedPropertiesLength } }
              );
              await changeBuyerStatus(ID, 'Shortlisted');
              await SharedBuyerProperty.updateMany(
        {buyerId: ID, },
        {$set: {isShortlisted: true, }});
       }
        else {
          await Buyer.updateOne(
            { _id: ID },
            { $set: { numberShortlisted: shortlistedPropertiesLength } }
          );
          await changeBuyerStatus(ID, 'CurrentlyViewing');
          await SharedBuyerProperty.updateMany(
            {buyerId: ID, },
            {$set: {isShortlisted: false, }, });
         }}}));
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

// Buyer side functions needs to be make in tandem with tenat functions

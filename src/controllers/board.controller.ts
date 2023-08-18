import { Request, Response } from 'express';
import {
  successResponse,
  failureResponse,
} from '../helpers/api-response.helper';
import Board from '../models/board.model';
import Property from '../models/property.model';
import SharedProperty from '../models/sharedProperty.model';
import SharedBuyerProperty from '../models/sharedBuyerProperty.model';
import { Types } from 'mongoose';
import { generateRandomKey } from '../services/crypto.service';
import { changeTenantStatus } from './tenant.controller';
import { changeBuyerStatus } from './buyer.controller';
import { Type } from '@aws-sdk/client-s3';

// Add new board
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
    await savedRecord.populate('propertyId');
    await savedRecord.populate('tenantId');
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

// Add property in board by property agent
export const addPropertyInBoard = async (req: Request, res: Response) => {
  const board = await Board.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { propertyId: req.body.propertyId } },
    { new: true }
  );
  if (!board) {
    return failureResponse(res, 404, [], 'Board not found.');
  }
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
    const userId = req.user.user._id;
    const board = await Board.findById(req.params.id)
      .populate('tenantId propertyId buyerId')
      .lean();
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    const update = updateViewedAtDate(board, propertyId, userId);
    console.log('updated record', update);
    return successResponse(
      res,
      200,
      { board },
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

const updateViewedAtDate = async (data, propertyId, userId) => {
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
                  tenantId: userId,
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
                  buyerId: userId,
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

// Finalize board by property agent
export const finalizeBoard = async (req: Request, res: Response) => {
  try {
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      {
        $set: { status: true },
      },
      { new: true }
    )
      .populate('tenantId buyerId propertyId')
      .lean();
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    const update = updateSharedPropertyTable(board);
    // const update = updateSharedDate(board);
    return successResponse(res, 200, { board }, 'Board finalize successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
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
          { new: true }
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
    console.log('board', board);
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    const update = updateSharedDate(board);
    let status1, status2;
    if (board && board.boardFor && board.boardFor === 'Tenant') {
      status1 = await changeTenantStatus(board.tenantId._id, 'Shared');
    } else if (board && board.boardFor && board.boardFor === 'Buyer') {
      status2 = await changeBuyerStatus(board.buyerId._id, 'Shared');
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
    const propertyId = req.body.propertyId;
    const userId = req.user.user._id;
    const board = await Board.findById(req.params.id)
      .populate('tenantId buyerId propertyId')
      .lean();
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    if (board && board.boardFor && board.boardFor === 'Tenant') {
      const status1 = await changeTenantStatus(userId, 'Shortlisted');
      const update1 = await updateShortlistDate(
        board,
        propertyId,
        userId,
        'Tenant'
      );
    } else if (board && board.boardFor && board.boardFor === 'Buyer') {
      const status2 = await changeBuyerStatus(userId, 'Shortlisted');
      const update2 = await updateShortlistDate(
        board,
        propertyId,
        userId,
        'Buyer'
      );
    }
    return successResponse(
      res,
      200,
      { board },
      'Property shortlisted successfully.'
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

const updateShortlistDate = async (data, propertyId, userId, boardFor) => {
  try {
    console.log('data', data, propertyId, userId);
    if (boardFor === 'Tenant') {
      return await Promise.all(
        data.propertyId.map(async (singleProperty) => {
          if (
            singleProperty._id.toString() === propertyId &&
            singleProperty.sharedProperty &&
            singleProperty.sharedProperty.length
          ) {
            return await SharedProperty.updateMany(
              {
                tenantId: userId,
                _id: { $in: singleProperty.sharedProperty },
              },
              { $set: { shortListedAt: Date.now(), isShortlisted: true } }
            );
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
                buyerId: userId,
                _id: { $in: singleProperty.sharedBuyerProperty },
              },
              { $set: { shortListedAt: Date.now(), isShortlisted: true } }
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

import { Request, Response } from 'express';
import {
  successResponse,
  failureResponse,
} from '../helpers/api-response.helper';
import Buyer from '../models/buyer.model';
import BuyerDetail from '../models/buyerDetail.model';
import { PipelineStage, Types } from 'mongoose';
import { generateJWTToken } from '../services/crypto.service';
import Board from '../models/board.model';
import { getS3ImagesByRankingSystem } from './uploadImage.controller';
import { tenantBuyerStatus } from '../constants/global.constants';

// Add new buyer
export const addBuyer = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    tempData.buyerData.agentId = new Types.ObjectId(req.user.user._id);

    //  Check version of buyer based on below conditions while add new buyer
    //   1. If same agent try to enter again same value for phoneNumber & status
    //         it should return as already exist buyer with this values
    //   2. If another agent try to add buyer and it matches with phoneNumber & status then increment it's version
    Buyer.find({
      $and: [{ phoneNumber: tempData.phoneNumber }],
    })
      .populate('buyerDetails')
      .exec(async (error: any, buyerExist: any) => {
        if (error) {
          return failureResponse(
            res,
            error.status || 500,
            error,
            error.message || 'Something went wrong'
          );
        } else if (buyerExist && buyerExist.length) {
          const buyerObj = buyerExist[0].buyerDetails.filter((x) =>
            x.agentId.equals(tempData.buyerData.agentId)
          );
          if (buyerObj && buyerObj.length) {
            return failureResponse(
              res,
              403,
              [],
              'Buyer already exist with this value'
            );
          } else {
            tempData.buyerData.version = buyerExist[0].buyerDetails.length + 1;
            const detailObj = new BuyerDetail(tempData.buyerData);
            const savedDetailObj: any = await detailObj.save();
            updateBuyerDetails(buyerExist[0]._id, savedDetailObj._id, res);
          }
        } else {
          const detailObj = new BuyerDetail(tempData.buyerData);
          const savedDetailObj: any = await detailObj.save();
          const buyerObj = new Buyer(tempData);
          const savedBuyerObj = await buyerObj.save();
          updateBuyerDetails(savedBuyerObj._id, savedDetailObj._id, res);
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

// Push Buyer detail id in buyer table
const updateBuyerDetails = (id, detailsId, res) => {
  const detailId = new Types.ObjectId(detailsId);
  Buyer.findByIdAndUpdate(
    { _id: id },
    { $push: { buyerDetails: detailId } },
    { new: true }
  )
    .populate('buyerDetails')
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
        updatedRecord.buyerDetails = [
          updatedRecord.buyerDetails[
            updatedRecord.buyerDetails.length - 1
          ],
        ];
        return successResponse(
          res,
          200,
          { buyer: updatedRecord },
          'New buyer added successfully.'
        );
      }
    });
};

//  Get all buyers
export const getAllBuyerList = async (req: Request, res: Response) => {
  try {
    /* Search is based on buyer name
     Filter is based on status of buyer like WaitingForProperty/Shared/CurrentlyViewing/Shortlisted/Deactivate
     and also for archive filter of deactivateStatus */
    const searchText: any = req.query.search;
    const filter: any = req.query.filter;
    const agentId = new Types.ObjectId(req.user.user._id);
    const aggregationPipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'buyerdetails',
          localField: 'buyerDetails',
          foreignField: '_id',
          as: 'buyerDetails',
        },
      },
      {
        $match: {
          'buyerDetails.agentId': agentId,
        },
      },
    ];
    if (searchText && searchText.trim()) {
      aggregationPipeline.push({
        $match: {
          'buyerDetails.name': {
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
              deactivateStatus: {
                $regex: new RegExp('^' + filter.trim().toLowerCase(), 'i'),
              },
            },
          ],
        },
      });
    }
    const buyers = await Buyer.aggregate(aggregationPipeline);
    // const buyers = await Buyer.find().populate('buyerDetails').lean();
    if (!buyers) {
      throw { status: 404, message: 'Buyers not found.' };
    }
    if (buyers && buyers.length) {
      buyers.map(
        (x) =>
          (x.buyerDetails = x.buyerDetails[x.buyerDetails.length - 1])
      );
    }
    return successResponse(res, 200, { buyers }, 'Buyers found successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Get buyer by id
export const getBuyerById = async (req: Request, res: Response) => {
  try {
    const buyer = await Buyer.findById(req.params.id)
      .populate('buyerDetails')
      .lean();
    if (!buyer) {
      return failureResponse(res, 404, [], 'Buyer not found.');
    }
    buyer.buyerDetails = [buyer.buyerDetails[buyer.buyerDetails.length - 1]];
    return successResponse(res, 200, { buyer }, 'Buyer found successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Change deactivate status of buyer
export const deactivateBuyer = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    const id = new Types.ObjectId(req.params.id);
    Buyer.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          deactivateStatus: tempData.deactivateStatus,
          status: 'Deactivate',
        },
      },
      { new: true }
    )
      .populate('buyerDetails')
      .exec(async (error, updatedRecord) => {
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
          updatedRecord.buyerDetails = [updatedRecord.buyerDetails[updatedRecord.buyerDetails.length - 1]];
          return successResponse(
            res,
            200,
            { buyer: updatedRecord },
            'Buyer status updated successfully.'
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

// Buyer login by phoneNumber
export const buyerLogin = async (req: Request, res: Response) => {
  try {
    const buyer = await Buyer.findOne({ phoneNumber: req.body.phoneNumber });
    if (!buyer) {
      return failureResponse(
        res,
        404,
        [],
        'Buyer not registered with this phone number.'
      );
    }
    const jwtToken = generateJWTToken(buyer);
    return successResponse(
      res,
      200,
      { buyer, jwtToken },
      'Buyer login successfully.'
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

// Get buyer dashboard count
export const getDashboardCount = async (req: Request, res: Response) => {
  try {
    const agentId = new Types.ObjectId(req.user.user._id);
    const aggregateQuery = await Buyer.aggregate([
      {
        $lookup: {
          from: 'buyerdetails',
          localField: 'buyerDetails',
          foreignField: '_id',
          as: 'buyerDetails',
        },
      },
      {
        $match: {
          'buyerDetails.agentId': agentId,
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
    const newObj: any = {};
    for (const key in tenantBuyerStatus) {
      if (typeof tenantBuyerStatus[key] === 'string') {
        newObj[tenantBuyerStatus[key]] = 0;
      }
    }
    newObj.Total = 0;
    console.log('aggregateQuery', aggregateQuery);
    let buyer = {};
    if (Object.keys(aggregateQuery).length === 0) {
      buyer = newObj;
    } else {
      buyer = aggregateQuery.reduce((obj, item) => {
        newObj[item.status] = item.count;
        newObj.Total += item.count;
        return newObj;
      }, {});
    }
    console.log('buyer', buyer);
    return successResponse(
      res,
      200,
      { buyer },
      'Buyer dashboard count get successfully.'
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

// Change buyer status
export const changeBuyerStatus = async (id, status) => {
  return await Buyer.findByIdAndUpdate(
    { _id: id },
    { $set: { status } },
    { new: true }
  );
};

// Get bords by buyer agent id
export const getBoardByAgentId = async (req: Request, res: Response) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      buyerId: req.user.user._id,
    }).populate('buyerId propertyId');
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    const status = await changeBuyerStatus(
      board.buyerId._id,
      'CurrentlyViewing'
    );
    const data = await getS3ImagesByRankingSystem(board);
    return successResponse(
      res,
      200,
      { board: data },
      'Board found successfully.'
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

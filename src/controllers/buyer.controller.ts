import { Request, Response } from 'express';
import {
  successResponse,
  failureResponse,
} from '../helpers/api-response.helper';
import Buyer from '../models/buyer.model';
import BuyerDetail from '../models/buyerDetail.model';
import { Types } from 'mongoose';

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
      $and: [
        { phoneNumber: tempData.phoneNumber },
        { status: tempData.status },
      ],
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
export const getAllBuyerList = async (_: Request, res: Response) => {
  try {
    const buyers = await Buyer.find().populate('buyerDetails').lean();
    if (!buyers) {
      throw { status: 404, message: 'Buyers not found.' };
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

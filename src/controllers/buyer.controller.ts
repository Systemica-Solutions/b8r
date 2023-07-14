import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../helpers/api-response.helper';
import Buyer from '../models/buyer.model';
import { Types } from 'mongoose';

// Add new buyer
export const addBuyer = async (req: Request, res: Response) => {
    try {
        const buyerData = req.body;
        buyerData.userId = new Types.ObjectId(req.user.user._id);

        //  Check version of buyer based on below conditions while add new buyer
        //   1. If same user try to enter again same value for buyerName & status
        //         it should return as already exist buyer with this values
        //   2. If another user try to add buyer and it matches with buyerName & status then increment it's version
        Buyer.find({ $and: [{ name: buyerData.name }, { status: buyerData.status }]})
          .exec(async (error: any, buyerExist: any) => {
            if (error) { return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong'); }
            else if (buyerExist && buyerExist.length) {
              const buyerObj = buyerExist.filter((x) => x.userId.equals(buyerData.userId));
              if (buyerObj && buyerObj.length) {
                return failureResponse(res, 403, [], 'Buyer already exist with this value');
              }
              else { buyerData.version = buyerExist[buyerExist.length - 1].version + 1; }
            }
            const newBuyer = new Buyer(buyerData);
            const saveObj = await newBuyer.save();
            return successResponse(res, 200, { buyer: saveObj }, 'New buyer added successfully.');
        });
    } catch (error) {
        return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
    }
};


//  Get all buyers
export const getAllBuyerList = async (_: Request, res: Response) => {
    try {
        const buyers = await Buyer.find().lean();
        if (!buyers) {
          throw { status: 404, message: 'Buyers not found.' };
        }
        return successResponse(res, 200, { buyers }, 'Buyers found successfully.');
      } catch (error) {
        return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
    }
};


// Get buyer by id
export const getBuyerById = async (req: Request, res: Response) => {
    try {
        const buyer = await Buyer.findById(req.params.id).lean();
        if (!buyer) {
          return failureResponse(res, 404, [], 'Buyer not found.');
        }
        return successResponse(res, 200, { buyer }, 'Buyer found successfully.');
      } catch (error) {
        return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
      }
};

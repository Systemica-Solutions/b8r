import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../helpers/api-response.helper';
import Buyer from '../models/buyer.model';

// Add new buyer
export const addBuyer = async (req: Request, res: Response) => {
    try {
        req.body.userId = req.user.user._id;
        const buyerObj = new Buyer(req.body);
        const saveObj = await buyerObj.save();
        return successResponse(res, 200, { buyer: saveObj }, 'New buyer added successfully.');
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

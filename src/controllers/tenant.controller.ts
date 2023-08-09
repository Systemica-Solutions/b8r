import { Request, Response } from 'express';
import {
  successResponse,
  failureResponse,
} from '../helpers/api-response.helper';
import Tenant from '../models/tenant.model';
import TenantDetail from '../models/tenantDetail.model';
import Board from '../models/board.model';
import { Types } from 'mongoose';
import { generateJWTToken } from '../services/crypto.service';
import { getS3ImagesByPropertyId } from './uploadImage.controller';

// Add new tenant
export const addTenant = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    tempData.tenantData.propertyAgentId = new Types.ObjectId(req.user.user._id);

    //  Check version of tenant based on below conditions while add new tenant
    //   1. If same user try to enter again same value for phoneNumber & status
    //         it should return as already exist tenant with this values
    //   2. If another user try to add tenant and it matches with phoneNumber & status then increment it's version
    Tenant.find({
      $and: [
        { phoneNumber: tempData.phoneNumber },
        { status: tempData.status },
      ],
    })
      .populate('tenantDetails')
      .exec(async (error: any, tenantExist: any) => {
        if (error) {
          return failureResponse(
            res,
            error.status || 500,
            error,
            error.message || 'Something went wrong'
          );
        } else if (tenantExist && tenantExist.length) {
          const tenantObj = tenantExist[0].tenantDetails.filter((x) =>
            x.propertyAgentId.equals(tempData.tenantData.propertyAgentId)
          );
          if (tenantObj && tenantObj.length) {
            return failureResponse(
              res,
              403,
              [],
              'Tenant already exist with this value'
            );
          } else {
            tempData.tenantData.version =
              tenantExist[0].tenantDetails.length + 1;
            const detailObj = new TenantDetail(tempData.tenantData);
            const savedDetailObj: any = await detailObj.save();
            updateTenantDetails(tenantExist[0]._id, savedDetailObj._id, res);
          }
        } else {
          const detailObj = new TenantDetail(tempData.tenantData);
          const savedDetailObj: any = await detailObj.save();
          const tenantObj = new Tenant(tempData);
          const savedTenantObj = await tenantObj.save();
          updateTenantDetails(savedTenantObj._id, savedDetailObj._id, res);
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

// Push tenant detail id in tenant table
const updateTenantDetails = (id, detailsId, res) => {
  const detailId = new Types.ObjectId(detailsId);
  Tenant.findByIdAndUpdate(
    { _id: id },
    { $push: { tenantDetails: detailId } },
    { new: true }
  )
    .populate('tenantDetails')
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
          { tenant: updatedRecord },
          'New tenant added successfully.'
        );
      }
    });
};

//  Get all tenants
export const getAllTenantList = async (_: Request, res: Response) => {
  try {
    const tenants = await Tenant.find().populate('tenantDetails').lean();
    if (!tenants) {
      throw { status: 404, message: 'Tenants not found.' };
    }
    return successResponse(
      res,
      200,
      { tenants },
      'Tenants found successfully.'
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

// Get tenant by id
export const getTenantById = async (req: Request, res: Response) => {
  try {
    const tenant = await Tenant.findById(req.params.id)
      .populate('tenantDetails')
      .lean();
    if (!tenant) {
      return failureResponse(res, 404, [], 'Tenant not found.');
    }
    return successResponse(res, 200, { tenant }, 'Tenant found successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Change status of tenant
export const deactivateTenant = async (req: Request, res: Response) => {
  try {
    const tempData = req.body;
    const id = new Types.ObjectId(tempData.tenantId);
    Tenant.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          deactivateStatus: tempData.deactivateStatus,
          status: 'Deactivate',
        },
      },
      { new: true }
    )
      .populate('tenantDetails')
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
          return successResponse(
            res,
            200,
            { tenant: updatedRecord },
            'Tenant status updated successfully.'
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

// Tenant login by phoneNumber
export const tenantLogin = async (req: Request, res: Response) => {
  try {
    const tenant = await Tenant.findOne({ phoneNumber: req.body.phoneNumber });
    if (!tenant) {
      return failureResponse(
        res,
        404,
        [],
        'Tenant not registered with this phone number.'
      );
    }
    const jwtToken = generateJWTToken(tenant);
    return successResponse(
      res,
      200,
      { tenant, jwtToken },
      'Tenant login successfully.'
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

// Get bords by tenant agent id
export const getBoardByAgentId = async (req: Request, res: Response) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      tenantId: req.user.user._id,
    }).populate('tenantId propertyId');
    if (!board) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    const status = await changeTenantStatus(board.tenantId._id, 'CurrentlyViewing');
    const data = await getS3ImagesByPropertyId(board);
    return successResponse(res, 200, { board: data }, 'Board found successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};


// Update last visited date of board
export const updateLastVisitDateBoard = async (req: Request, res: Response) => {
  try {
    const boards = await Board.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user.user._id },
      {
        $set: { lastVisitedAt: Date.now() },
      },
      { new: true }
    )
      .populate('tenantId propertyId')
      .lean();
    if (!boards) {
      return failureResponse(res, 404, [], 'Board not found.');
    }
    return successResponse(res, 200, { boards }, 'Board updated successfully.');
  } catch (error) {
    return failureResponse(
      res,
      error.status || 500,
      error,
      error.message || 'Something went wrong'
    );
  }
};

// Change tenant status
export const changeTenantStatus = async (id, status) => {
  return await Tenant.findByIdAndUpdate(
    { _id: id },
    { $set: { status } },
    { new: true }
  );
};
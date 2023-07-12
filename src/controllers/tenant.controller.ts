import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../helpers/api-response.helper';
import Tenant from '../models/tenant.model';

// Add new tenant
export const addTenant = async (req: Request, res: Response) => {
    try {
        req.body.createdBy = req.user.user._id;
        const tenantObj = new Tenant(req.body);
        const saveObj = await tenantObj.save();
        return successResponse(res, 200, { tenant: saveObj }, 'New tenant added successfully.');
    } catch (error) {
        return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
    }
};


//  Get all tenants
export const getAllTenantList = async (_: Request, res: Response) => {
    try {
        const tenants = await Tenant.find().lean();
        if (!tenants) {
          throw { status: 404, message: 'Tenants not found.' };
        }
        return successResponse(res, 200, { tenants }, 'Tenants found successfully.');
      } catch (error) {
        return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
    }
};


// Get tenant by id
export const getTenantById = async (req: Request, res: Response) => {
    try {
        const tenant = await Tenant.findById(req.params.id).lean();
        if (!tenant) {
          return failureResponse(res, 404, [], 'Tenant not found.');
        }
        return successResponse(res, 200, { tenant }, 'Tenant found successfully.');
      } catch (error) {
        return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong');
      }
};

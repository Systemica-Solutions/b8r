import { Request, Response } from 'express';
import { successResponse, failureResponse } from '../helpers/api-response.helper';
import Tenant from '../models/tenant.model';
import { Types } from 'mongoose';

// Add new tenant
export const addTenant = async (req: Request, res: Response) => {
    try {
      const tenantData = req.body;
      tenantData.userId = new Types.ObjectId(req.user.user._id);

      //  Check version of tenant based on below conditions while add new tenant
      //   1. If same user try to enter again same value for tenantName & status
      //         it should return as already exist tenant with this values
      //   2. If another user try to add tenant and it matches with tenantName & status then increment it's version
      Tenant.find({ $and: [{ name: tenantData.name }, { status: tenantData.status }]})
        .exec(async (error: any, tenantExist: any) => {
          if (error) { return failureResponse(res, error.status || 500, error, error.message || 'Something went wrong'); }
          else if (tenantExist && tenantExist.length) {
            const tenantObj = tenantExist.filter((x) => x.userId.equals(tenantData.userId));
            if (tenantObj && tenantObj.length) {
              return failureResponse(res, 403, [], 'Tenant already exist with this value');
            }
            else { tenantData.version = tenantExist[tenantExist.length - 1].version + 1; }
          }
          const newTenant = new Tenant(tenantData);
          const saveObj = await newTenant.save();
          return successResponse(res, 200, { tenant: saveObj }, 'New tenant added successfully.');
      });
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

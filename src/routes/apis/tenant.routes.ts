import { Router } from 'express';
import { getAllTenantList, addTenant, getTenantById, changeTenantStatus } from '../../controllers/tenant.controller';
import { addTenantValidation, tenantDetailValidation } from '../../validation/tenant.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

// Get all tenants
router.get('/', userAuth, getAllTenantList);

// Add new tenant
router.post('/', userAuth,  addTenantValidation, tenantDetailValidation, addTenant);

// Get tenant by id
router.get('/:id', userAuth, getTenantById);

// Change status of tenant
router.put('/change-status', userAuth, changeTenantStatus);

export default router;

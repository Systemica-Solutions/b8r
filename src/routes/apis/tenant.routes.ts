import { Router } from 'express';
import {
  getAllTenantList,
  addTenant,
  getTenantById,
  deactivateTenant,
  tenantLogin,
  getBoardByAgentId,
  getDashboardCount,
  v2getboard
} from '../../controllers/tenant.controller';
import {
  addTenantValidation,
  tenantDetailValidation,
  tenantStatusValidation
} from '../../validation/tenant.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

// Get count of tenants for property agent dashboard
router.get('/count', userAuth, getDashboardCount);

// Get all tenants
router.get('/', userAuth, getAllTenantList);

// Add new tenant
router.post(
  '/',
  userAuth,
  addTenantValidation,
  tenantDetailValidation,
  addTenant
);

// Get tenant by id
router.get('/:id', userAuth, getTenantById);

// Get board by tenant agent id

router.get('/board/:id', userAuth, getBoardByAgentId);

// v2 of above api

router.get('/v2/board/:id', userAuth, v2getboard);

// Change status of tenant
router.put('/deactivate/:id', userAuth, tenantStatusValidation, deactivateTenant);

// Login tenant by phoneNumber
router.post('/login', tenantLogin);

export default router;

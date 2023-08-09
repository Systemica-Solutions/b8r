import { Router } from 'express';
import {
  getAllTenantList,
  addTenant,
  getTenantById,
  deactivateTenant,
  tenantLogin,
  getBoardByAgentId,
  updateLastVisitDateBoard
} from '../../controllers/tenant.controller';
import {
  addTenantValidation,
  tenantDetailValidation,
  tenantStatusValidation
} from '../../validation/tenant.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

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

// Change status of tenant
router.put('/deactivate', userAuth, tenantStatusValidation, deactivateTenant);

// Login tenant by phoneNumber
router.post('/login', tenantLogin);

// Update last visited date of board by board-id
router.put('/board/:id', userAuth, updateLastVisitDateBoard);

export default router;

import { Router } from 'express';
import {
  verifyProperty,
  getFieldAgentHomeCount,
  getFieldAgentPendingProperty,
} from '../../controllers/field-agent.controller';
import {
  propertyDetailValidation,
  verifyPropertyValidation,
} from '../../validation/property.validation';
import {
  userAuth,
  fieldAgentAccess,
} from '../../middleware/user-auth.middleware';

const router = Router();

// Get properties count for field agent
router.get('/count', userAuth, fieldAgentAccess, getFieldAgentHomeCount);

// Get pending property for field agent dashboard
router.get(
  '/pending',
  userAuth,
  fieldAgentAccess,
  getFieldAgentPendingProperty
);

// Verify property details
router.put(
  '/verify/:id',
  userAuth,
  verifyPropertyValidation,
  propertyDetailValidation,
  verifyProperty
);

export default router;

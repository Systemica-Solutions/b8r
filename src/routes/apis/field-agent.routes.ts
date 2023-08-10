import { Router } from 'express';
import {
  verifyProperty,
  getFieldAgentHomeCount,
  getFieldAgentPendingProperty,
} from '../../controllers/field-agent.controller';
import { verifyPropertyValidation } from '../../validation/property.validation';
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

// Verify property
router.post('/verify', userAuth, verifyPropertyValidation, verifyProperty);

export default router;

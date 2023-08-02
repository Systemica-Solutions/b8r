import { Router } from 'express';
import {
  getAllPropertyList,
  addProperty,
  getPropertyById,
  verifyProperty,
  closeListingProperty,
  assignPropertyToFA,
  getPropertyCounts,
  getFieldAgentPendingProperty,
} from '../../controllers/property.controller';
import {
  addPropertyValidation,
  propertyDetailValidation,
  verifyPropertyValidation,
} from '../../validation/property.validation';
import {
  userAuth,
  fieldAgentAccess,
} from '../../middleware/user-auth.middleware';
import uploadRoutes from '../apis/upload.routes';

const router = Router();

// Get properties for field agent
router.get('/count', userAuth, fieldAgentAccess, getPropertyCounts);

// Get pending property for field agent dashboard
router.get(
  '/pending',
  userAuth,
  fieldAgentAccess,
  getFieldAgentPendingProperty
);

// Get all properties
router.get('/', userAuth, getAllPropertyList);

// Add new property
router.post(
  '/',
  userAuth,
  addPropertyValidation,
  propertyDetailValidation,
  addProperty
);

// Get property by id
router.get('/:id', userAuth, getPropertyById);

// Assign property to Field Agent
router.post('/assign', userAuth, assignPropertyToFA);

// Assign property to Field Agent
router.post('/verify', userAuth, verifyPropertyValidation, verifyProperty);

// Edit property status with close listing property
router.put('/close-listing', userAuth, closeListingProperty);

// Upload property images
router.use('/upload', uploadRoutes);

export default router;

import { Router } from 'express';
import {
  getAllPropertyList,
  addProperty,
  getPropertyById,
  closeListingProperty,
  assignPropertyToFA,
  getPropertyCounts,
  shortlistedProperty,
} from '../../controllers/property.controller';
import {
  addPropertyValidation,
  propertyDetailValidation,
  closeListingValidation,
} from '../../validation/property.validation';
import { userAuth } from '../../middleware/user-auth.middleware';
import uploadRoutes from '../apis/upload.routes';

const router = Router();

// Get property dashboard count
router.get('/count', userAuth, getPropertyCounts);

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

// Edit property status with close listing property
router.put(
  '/close-listing',
  userAuth,
  closeListingValidation,
  closeListingProperty
);

// Short-listed shared property
router.put('/short-listed', shortlistedProperty);

// Upload property images
router.use('/upload', uploadRoutes);

export default router;

import { Router } from 'express';
import {
  getAllPropertyList,
  addProperty,
  getPropertyById,
  closeListingProperty,
  assignPropertyToFA,
  getPropertyCounts,
  getPropertyImagesFromS3,
  renameAndCopyBoardImagesOfS3,
  getAllPropertyImages
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

// Get all property images fom s3 which are not moved to final folder yet
router.get('/s3-img', getAllPropertyImages);

// Get s3 images of property
router.get('/s3-img/:id', getPropertyImagesFromS3);

// Rename and copy s3 files to files folder
router.put('/s3-img/:id', renameAndCopyBoardImagesOfS3);

// Upload property images
router.use('/upload', uploadRoutes);

export default router;

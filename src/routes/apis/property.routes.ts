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
  getAllPropertyImages,
  getPropertyStatus,
  reactivateProperty
} from '../../controllers/property.controller';
import {
  addPropertyValidation,
  propertyDetailValidation,
  closeListingValidation,
  reactivateValidation
} from '../../validation/property.validation';
import { userAuth } from '../../middleware/user-auth.middleware';
import uploadRoutes from '../apis/upload.routes';

const router = Router();


// ------- upload routes start -------

// Upload property images
router.use('/upload', uploadRoutes);

// Get all property images fom s3 which are not moved to final folder yet
router.get('/s3-img', getAllPropertyImages);

// Get s3 images of property
router.get('/s3-img/:id', getPropertyImagesFromS3);

// ------- upload routes end -------

// Rename and copy s3 files to files folder
router.put('/s3-img/:id', renameAndCopyBoardImagesOfS3);

// Get property agent dashboard count
router.get('/count', userAuth, getPropertyCounts);

// Check status of single property
router.get('/check-status/:id', userAuth, getPropertyStatus);

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
router.post('/assign', assignPropertyToFA);

// Edit property status with close listing property
router.put(
  '/close-listing/:id',
  userAuth,
  closeListingValidation,
  closeListingProperty
);

// Edit property status with reactivate property
router.put(
  '/reactivate/:id',
  userAuth,
  reactivateValidation,
  reactivateProperty
);

export default router;

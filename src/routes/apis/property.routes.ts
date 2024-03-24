import { Router } from 'express';
import {
  getAllPropertyList,
  getAllPropertyinDB,
  addProperty,
  getPropertyById,
  closeListingProperty,
  assignPropertyToFA,
  getPropertyCounts,
  getPropertyImagesFromS3Final,
  getPropertyImagesFromS3Raw,
  renameAndCopyBoardImagesOfS3,
  getAllPropertyImages,
  getPropertyStatus,
  reactivateProperty,
  editProperty,
  propertyViewingStatus,
  addImages,
  getPropertiesForAgent,
  sharedPropertiesList,
  shortlistedPropertiesList
} from '../../controllers/property.controller';
import {
  addPropertyValidation,
  propertyDetailValidation,
  closeListingValidation,
  reactivateValidation,
  editPropertyValidation,
  propertyDetailVerificationValidation
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
router.get('/s3-img/:id', getPropertyImagesFromS3Final);

router.get('/s3-img-raw/:id', getPropertyImagesFromS3Raw);

// Rename and copy s3 files to files folder
router.put('/s3-img/:id', renameAndCopyBoardImagesOfS3);

// ------- upload routes end -------


// Get property agent dashboard count
router.get('/count', userAuth, getPropertyCounts);

// Check status of single property
router.get('/check-status/:id', userAuth, getPropertyStatus);

// Get all properties for property agent
router.get('/', userAuth, getAllPropertyList);

//Get properties for property agent used by Admin(no need of Auth)
router.get('/agent-property/:id', getPropertiesForAgent);

// Get all properties in database
router.get('/all', getAllPropertyinDB);

// Add new property
router.post(
  '/',
  userAuth,
  addPropertyValidation,
  propertyDetailValidation,
  addProperty
);

// Edit existing property
router.put(
  '/:id',
  userAuth,
  editPropertyValidation,
  propertyDetailVerificationValidation,
  editProperty
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

router.get('/shared/:id', userAuth, sharedPropertiesList)

router.get('/shortlisted/:id', userAuth, shortlistedPropertiesList)
router.get(
  '/viewing-status/:id',
  userAuth,
  propertyViewingStatus
);

router.post(
  '/add-images/:id',
  addImages
);

export default router;

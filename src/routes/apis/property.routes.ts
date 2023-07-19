import { Router } from 'express';
import { getAllPropertyList, addProperty, getPriorityById, getPropertyCounts } from '../../controllers/property.controller';
import { addPropertyValidation, propertyDetailValidation } from '../../validation/property.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

router.get('/count', userAuth, getPropertyCounts);

// Get all properties
router.get('/', userAuth, getAllPropertyList);

// Add new property
router.post('/', userAuth, addPropertyValidation, propertyDetailValidation, addProperty);


// Get property by id
router.get('/:id', userAuth, getPriorityById);


export default router;

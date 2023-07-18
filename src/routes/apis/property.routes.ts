import { Router } from 'express';
import { getAllPropertyList, addProperty, getPriorityById } from '../../controllers/property.controller';
import { addPropertyValidation } from '../../validation/property.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

// Get all properties
router.get('/', userAuth, getAllPropertyList);

// Add new property
// router.post('/', userAuth,  addPropertyValidation, addProperty);
router.post('/', userAuth, addProperty);

// Get property by id
router.get('/:id', userAuth, getPriorityById);



export default router;

import { Router } from 'express';
import { getAllPropertyList, addProperty, getPriorityById } from '../../controllers/property.controller';
import { addPropertyValidation } from '../../validation/property.validation';
import { userAuth } from '../../middleware/user-auth.middleware';
import { getPriority } from 'os';

const router = Router();

// Get all properties
router.get('/', getAllPropertyList);

// Get property by id
router.get('/:id', userAuth, getPriorityById);

// Add new property
router.post('/add', userAuth,  addPropertyValidation, addProperty);


export default router;

import { Router } from 'express';
import { getAllPropertyList, addProperty, getPriorityById,
    assignPropertyToFA, getPropertyCounts, getFieldAgentPendingProperty } from '../../controllers/property.controller';
import { addPropertyValidation, propertyDetailValidation } from '../../validation/property.validation';
import { userAuth, fieldAgentAccess } from '../../middleware/user-auth.middleware';
import uploadRoutes from '../apis/upload.routes';

const router = Router();

// Get properties for field agent
router.get('/count', userAuth, fieldAgentAccess, getPropertyCounts);

// Get pending property for field agent dashboard
router.get('/pending', userAuth, fieldAgentAccess, getFieldAgentPendingProperty);

// Get all properties
router.get('/', userAuth, getAllPropertyList);

// Add new property
router.post('/', userAuth, addPropertyValidation, propertyDetailValidation, addProperty);

// Get property by id
router.get('/:id', userAuth, getPriorityById);

// Assign property to Field Agent
router.post('/assign', userAuth, assignPropertyToFA);

router.use('/upload', uploadRoutes);

export default router;

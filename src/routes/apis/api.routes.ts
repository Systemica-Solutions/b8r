import { Router } from 'express';
import userRoutes from '../apis/user.routes';
import propertyRoutes from '../apis/property.routes';
import buyerRoutes from '../apis/buyer.routes';
import tenantRoutes from '../apis/tenant.routes';
import uploadRoutes from '../apis/upload.routes';

const router = Router();

router.use('/user', userRoutes);

router.use('/property', propertyRoutes);

router.use('/tenant', tenantRoutes);

router.use('/buyer', buyerRoutes);

router.use('/upload', uploadRoutes);

export default router;

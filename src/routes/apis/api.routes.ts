import { Router } from 'express';
import agentRoutes from '../apis/agent.routes';
import propertyRoutes from '../apis/property.routes';
import buyerRoutes from '../apis/buyer.routes';
import tenantRoutes from '../apis/tenant.routes';
import boardRoutes from '../apis/board.routes';
import fieldAgentRoutes from '../apis/field-agent.routes';

const router = Router();

router.use('/agent', agentRoutes);

router.use('/property', propertyRoutes);

router.use('/tenant', tenantRoutes);

router.use('/buyer', buyerRoutes);

router.use('/board', boardRoutes);

router.use('/field-agent', fieldAgentRoutes);

export default router;

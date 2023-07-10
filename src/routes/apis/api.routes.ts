import { Router } from 'express';
import UserRoutes from '../apis/user.routes';

const router = Router();

router.use('/users', UserRoutes);

export default router;

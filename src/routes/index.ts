import { Router } from 'express';
import APIRoutes from './apis/api.routes';
import { successResponse, failureResponse } from '../helpers/api-response.helper';

const router = Router();

/* Check server is working or not */
router.get('/', function(req, res, next) {
  try {
    return successResponse(res, 200, 'Better homes server working properly.');
  } catch (error) {
    return failureResponse(res, error, error.message || 'Something went wrong', error.status || 500);
  }
});

router.use(APIRoutes);

export default router;

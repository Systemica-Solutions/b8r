import { Router } from 'express';
import {
  getAllBuyerList,
  addBuyer,
  getBuyerById,
  deactivateBuyer,
  buyerLogin,
  getDashboardCount
} from '../../controllers/buyer.controller';
import {
  addBuyerValidation,
  buyertDetailValidation,
  buyerStatusValidation,
} from '../../validation/buyer.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

// Get count of buyers for property agent dashboard
router.get('/count', userAuth, getDashboardCount);

// Get all buyers
router.get('/', userAuth, getAllBuyerList);

// Add new buyer
router.post(
  '/',
  userAuth,
  addBuyerValidation,
  buyertDetailValidation,
  addBuyer
);

// Get buyer by id
router.get('/:id', userAuth, getBuyerById);

// Change status of buyer
router.put('/deactivate/:id', userAuth, buyerStatusValidation, deactivateBuyer);

// Buyer Login by phoneNumber
router.post('/login', buyerLogin);

export default router;

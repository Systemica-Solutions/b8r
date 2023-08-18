import { Router } from 'express';
import {
  getAllBuyerList,
  addBuyer,
  getBuyerById,
  deactivateBuyer,
  // buyerLogin
} from '../../controllers/buyer.controller';
import {
  addBuyerValidation,
  buyertDetailValidation,
  buyerStatusValidation
} from '../../validation/buyer.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

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

// Login buyer by phoneNumber
// router.post('/login', buyerLogin);

export default router;

import { Router } from 'express';
import {
  addBoard,
  addPropertyInBoard,
  finalizeBoard,
  shareBoard,
  updatePropertyViewAtDate,
  shortlistDate,
  updateLastVisitDateTenantBoard,
  updateLastVisitDateBuyerBoard,
  getBoardById
} from '../../controllers/board.controller';
import {
  boardValidation,
  addProeprtyInboardValidation,
} from '../../validation/board.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

// Add new board
router.post('/', userAuth, boardValidation, addBoard);

// Add property to board
router.put(
  '/property/:id',
  userAuth,
  addProeprtyInboardValidation,
  addPropertyInBoard
);

// View property date
router.put('/view-property/:id', userAuth, updatePropertyViewAtDate);

// Add date while shortlist property
router.put('/shortlist/:id', userAuth, shortlistDate);

// Find board by board id
router.get('/:id', userAuth, getBoardById);

// Finalize board
router.put('/finalize/:id', userAuth, finalizeBoard);

// Share board
router.put('/share/:id', userAuth, shareBoard);

// Update last visited date of board by board-id
router.put('/tenant/:id', userAuth, updateLastVisitDateTenantBoard);

// Update last visited date of board by board-id
router.put('/buyer/:id', userAuth, updateLastVisitDateBuyerBoard);

export default router;

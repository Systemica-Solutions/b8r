import { Router } from 'express';
import {
  addBoard,
  addPropertyInBoard,
  finalizeBoard,
  shareBoard,
  updatePropertyViewAtDate,
  shortlistDate
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

// Finalize board
router.get('/finalize/:id', userAuth, finalizeBoard);

// Share board
router.put('/share/:id', userAuth, shareBoard);

export default router;

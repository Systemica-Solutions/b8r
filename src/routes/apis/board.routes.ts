import { Router } from 'express';
import {
  addBoard,
  updateLastVisitDateBoard,
  addPropertyInBoard,
  finalizeBoard,
} from '../../controllers/board.controller';
import {
  boardValidation,
  addProeprtyInboardValidation,
} from '../../validation/board.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

// Add new board
router.post('/', userAuth, boardValidation, addBoard);

// Update last visited date of board
router.put('/:id', userAuth, updateLastVisitDateBoard);

// Add property to board
router.put(
  '/property/:id',
  userAuth,
  addProeprtyInboardValidation,
  addPropertyInBoard
);

// Finalize board
router.get('/finalize/:id', userAuth, finalizeBoard);

export default router;

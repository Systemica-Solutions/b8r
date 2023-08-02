import { Router } from 'express';
import {
  addBoard,
  getBoardByAgentId,
  editLastVisitDateBoard,
  addPropertyInBoard,
  finalizeBoard
} from '../../controllers/board.controller';
import { boardValidation } from '../../validation/board.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

// Add new board
router.post('/', userAuth, boardValidation, addBoard);

// Edit board
router.put('/:id', userAuth, boardValidation, editLastVisitDateBoard);

// Get board by tenant agent id
router.get('/:id', getBoardByAgentId);

// Add property to board
router.put('/property/:id', userAuth, addPropertyInBoard);

// Finalize board
router.put('/finalize/:id', userAuth, finalizeBoard);

export default router;

import { Router } from 'express';
import {
  addBoard,
  getBoardByAgentId,
  editBoard,
  addPropertyInBoard,
} from '../../controllers/board.controller';
import { boardValidation } from '../../validation/board.validation';
import { userAuth } from '../../middleware/user-auth.middleware';

const router = Router();

// Add new board
router.post('/', userAuth, boardValidation, addBoard);

// Edit board
router.put('/:id', userAuth, boardValidation, editBoard);

// Get board by property agent id
router.get('/:id', userAuth, getBoardByAgentId);

// Add property to board
router.put('/property/:id', userAuth, addPropertyInBoard);

export default router;

import { Router } from 'express';
import {
  addBoard,
  getBoardByAgentId,
  editBoard,
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

export default router;

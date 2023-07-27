import { Router } from "express";
import { addBoard } from "../../controllers/board.controller";
import { addBoardValidation } from "../../validation/board.validation";
import { userAuth } from "../../middleware/user-auth.middleware";

const router = Router();

// Add new board
router.post("/", userAuth, addBoardValidation, addBoard);

// Get buyer by id
// router.get('/:id', userAuth, getBoardById);

export default router;

import { Router } from "express";
import {
  addBoard,
  getBoardByAgentId,
//   editBoard,
} from "../../controllers/board.controller";
import {
  addBoardValidation,
//   editBoardValidation,
} from "../../validation/board.validation";
import { userAuth } from "../../middleware/user-auth.middleware";

const router = Router();

// Add new board
router.post("/", userAuth, addBoardValidation, addBoard);

// router.put("/", userAuth, editBoardValidation, editBoard);

// Get board by property agent id
router.get("/:id", userAuth, getBoardByAgentId);

export default router;

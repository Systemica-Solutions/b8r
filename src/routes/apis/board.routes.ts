import { Router } from 'express';
import {
  addBoard,
  addPropertyInBoard,
  finalizeBoard,
  shareBoard,
  updatePropertyViewAtDate,
  shortlistDate,
  getBoardImagesFromS3,
  renameAndCopyBoardImagesOfS3
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

// Get s3 images of property
router.get('/s3-img/:id', getBoardImagesFromS3);

// Rename and copy s3 files to files folder
router.put('/s3-img/:id', renameAndCopyBoardImagesOfS3);

export default router;

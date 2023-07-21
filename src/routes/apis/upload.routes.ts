import { Router } from 'express';
import { uploadImages } from '../../services/upload.service';
import { userAuth } from '../../middleware/user-auth.middleware';
import multer from 'multer';

const router = Router();

// Upload multiple images (maximum 20-images are allowed)
router.post('/', userAuth, multer({ dest: 'temp/', limits: { fieldSize: 10 * 1024 * 1024 } }).array('images', 20), uploadImages);

export default router;

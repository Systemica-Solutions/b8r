import { Router } from 'express';
import { upload } from '../../services/upload.service';

import multer from 'multer';

const router = Router();

// Upload multiple images
router.post('/', multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).array('images', 20), upload);

export default router;

import { Router } from 'express';
import { uploadPrpertyImages } from '../../controllers/uploadImage.controller';
import { fieldAgentAccess, userAuth } from '../../middleware/user-auth.middleware';
import multer from 'multer';

const router = Router();

// Upload multiple images (maximum 20-images are allowed with 10mb)
router.post('/', userAuth, fieldAgentAccess,
            multer({ dest: 'temp/', limits: { fieldSize: 100 * 1024 * 1024 } }).array('images', 20), uploadPrpertyImages);

export default router;

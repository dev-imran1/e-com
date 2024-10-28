import express from 'express';
import { auth } from '../middlewares/authMiddleware.js';
import { adminAuth } from '../middlewares/adminAuthMiddleware.js';
import { allSubCategroy, subCategoryCreate } from '../controllers/subCategroyControllers.js';

import { createProduct } from '../controllers/productController.js';
import { upload } from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.route("/products/create").post(upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'gallery', maxCount: 4 }]),createProduct)

export default router

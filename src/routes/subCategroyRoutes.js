
// In your route file
import express from 'express';
import { auth } from '../middlewares/authMiddleware.js';
import { adminAuth } from '../middlewares/adminAuthMiddleware.js';
import { allSubCategroy, subCategoryCreate } from '../controllers/subCategroyControllers.js';

const router = express.Router();

router.route("/subcategories").get(allSubCategroy)
router.route("/subcategories/create").post(auth, adminAuth, subCategoryCreate)

export default router; 

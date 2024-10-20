
// In your route file
import express from 'express';
const router = express.Router();
import { auth } from '../middlewares/authMiddleware.js';
import { adminAuth } from '../middlewares/adminAuthMiddleware.js';
import { subCategoryCreate } from '../controllers/subCategroyControllers.js';


router.route("/subcategories/create").post(auth,adminAuth,subCategoryCreate)

export default router; 
// 26 minutes
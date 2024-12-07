
// In your route file
import express from 'express';
const router = express.Router();
import { auth } from '../middlewares/authMiddleware.js';
import { adminAuth } from '../middlewares/adminAuthMiddleware.js';
import { categoryCreate, getCategory } from '../controllers/categoryControllers.js';



router.route("/category/create").post(auth,adminAuth,categoryCreate)
// router.route("/category/create").post(auth,categoryCreate)
router.route("/categories").get(getCategory)

export default router; 

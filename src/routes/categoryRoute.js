
// In your route file
import express from 'express';
const router = express.Router();
import { auth } from '../middlewares/authMiddleware.js';
import { adminAuth } from '../middlewares/adminAuthMiddleware.js';
import { categoryCreate } from '../controllers/categoryControllers.js';



router.route("/categories/create").post(auth,adminAuth,categoryCreate)

export default router; 

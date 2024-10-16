
// In your route file
import express from 'express';
const router = express.Router();
import { auth } from '../middlewares/authMiddleware.js';
import { adminAuth } from '../middlewares/adminAuthMiddleware.js';



router.route("/categories/create").get(auth,adminAuth,(req,res)=>{
    console.log('creted')
})

export default router; 

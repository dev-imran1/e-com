
// In your route file
import express from 'express';
const router = express.Router();
import { createUser,emailVerify } from '../controllers/userControllers.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';

router.route("/user").post(validationMiddleware,createUser); // Defines POST route to create a user
router.route("/user/:link").get(emailVerify)

export default router; // Export the router
 
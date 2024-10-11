
// In your route file
import express from 'express';
const router = express.Router();
import { createUser, emailVerify, login, userUpdate } from '../controllers/userControllers.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { upload } from '../middlewares/multerMiddleware.js';


router.route("/user").post(validationMiddleware, createUser); // Defines POST route to create a user
router.route("/user/:link").get(emailVerify)
router.route("/user/login").post(login)
router.route("/user/userUpdate").post(upload.single('avatar'),userUpdate)

export default router; // Export the router

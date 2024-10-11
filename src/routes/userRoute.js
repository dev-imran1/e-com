
// In your route file
import express from 'express';
const router = express.Router();
import { createUser, emailVerify, login, userUpdate } from '../controllers/userControllers.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { auth } from '../mailTemplate/authMiddleware.js';


router.route("/user").post(validationMiddleware, createUser); // Defines POST route to create a user
router.route("/user/:link").get(emailVerify)
router.route("/user/login").post(login)
router.route("/user/update").post(auth,upload.single('profilePic'),userUpdate)
// router.route("/user/edit").post(userEdit)

export default router; // Export the router

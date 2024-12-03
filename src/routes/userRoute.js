
// In your route file
import express from 'express';
const router = express.Router();
import { createUser, emailVerify, logOut, login, userUpdate } from '../controllers/userControllers.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { auth } from '../middlewares/authMiddleware.js';
import { adminAuth } from '../middlewares/adminAuthMiddleware.js';

router.route("/users").post(validationMiddleware,createUser);
router.route("/users/:link").get(emailVerify)
router.route("/users/login").post(login)
router.route("/users/update").post(auth, upload.single('profilePic'), userUpdate)
router.route("/users/logout").post(auth,logOut)


export default router; // Export the router

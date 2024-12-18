
// In your route file
import express from 'express';
const router = express.Router();
import { createUser, emailVerify, getUser, logOut, login, userUpdate } from '../controllers/userControllers.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { auth } from '../middlewares/authMiddleware.js';
import { adminAuth } from '../middlewares/adminAuthMiddleware.js';

router.route("/users/single/:id").get(getUser)
router.route("/users/:link").get(emailVerify)
router.route("/users").post(validationMiddleware,createUser);
router.route("/users/logout").post(auth,logOut)
router.route("/users/login").post(login)
router.route("/users/update").post(auth, upload.single('profilePic'), userUpdate)

export default router;


// In your route file
import express from 'express';
const router = express.Router();
import { createUser, emailVerify, logOut, login, userUpdate } from '../controllers/userControllers.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { auth } from '../mailTemplate/authMiddleware.js';


router.route("/users").post(createUser); // Defines POST route to create a user
router.route("/users/registration").post(validationMiddleware, createUser); // Defines POST route to create a user
router.route("/users/:link").get(emailVerify)
router.route("/users/login").post(login)
router.route("/users/update").post(auth, upload.single('profilePic'), userUpdate)
router.route("/users/logout").post(auth, logOut)

export default router; // Export the router

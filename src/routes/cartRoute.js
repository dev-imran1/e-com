// In your route file
import express from "express";
const router = express.Router();
// import { auth } from "../middlewares/authMiddleware.js";
// import { adminAuth } from "../middlewares/adminAuthMiddleware.js";
import { createCart, updateQuntity } from "../controllers/createCart.js";

// router.route("/cart/create").post(auth, adminAuth,categoryCart);
router.route("/cart/create").post(createCart);
router.route("/cart/update").post(updateQuntity);

export default router;
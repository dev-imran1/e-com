// In your route file
import express from "express";
const router = express.Router();
// import { auth } from "../middlewares/authMiddleware.js";
// import { adminAuth } from "../middlewares/adminAuthMiddleware.js";
import { createOrder } from "../controllers/orderController.js";


router.route("/order/create").post(createOrder);

export default router;
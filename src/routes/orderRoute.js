// In your route file
import express from "express";
const router = express.Router();
import { auth } from "../middlewares/authMiddleware.js";
// import { adminAuth } from "../middlewares/adminAuthMiddleware.js";
import { allOrders, createOrder } from "../controllers/orderController.js";


router.route("/order/create").post(auth,createOrder);
router.route("/all/orders").get(auth,allOrders);

export default router;
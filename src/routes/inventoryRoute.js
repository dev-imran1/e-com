// In your route file
import express from "express";
const router = express.Router();
import { auth } from "../middlewares/authMiddleware.js";
import { adminAuth } from "../middlewares/adminAuthMiddleware.js";
import { createInventory,updateInventory } from "../controllers/inventoryController.js";

// router.route("/inventory/create").post(auth, adminAuth, createInventory);
router.route("/inventory/create").post(createInventory);
router.route("/inventory/update/:id").post(updateInventory);

export default router;

//1.18 minutes
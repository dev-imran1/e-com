// In your route file
import express from "express";
const router = express.Router();
import { auth } from "../middlewares/authMiddleware.js";
import { adminAuth } from "../middlewares/adminAuthMiddleware.js";
import { createVariation } from "../controllers/variationController.js";

// router.route("/variations/create").post(auth, adminAuth, createVariation);
router.route("/variations/create").post( createVariation);

export default router;

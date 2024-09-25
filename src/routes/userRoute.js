
// In your route file
import express from 'express';
const router = express.Router();
import { createUser } from '../controllers/userControllers.js'; // Ensure correct path

router.route("/user").post(createUser); // Defines POST route to create a user

export default router; // Export the router

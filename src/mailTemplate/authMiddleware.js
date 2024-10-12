import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SC);
        if (!decodedToken) {
            return res.send("dedoced not found")
        }
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(401).send({ error: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
    }
};


//28 minutes
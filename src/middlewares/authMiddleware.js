import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const auth = async (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send({ error: 'Authorization token is required' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SC,function(err,result){
            if(err){
                return null
            }else{
                return result
            }
        })
        
        
        if (!decodedToken) {
            return res.status(401).send({ error: 'Invalid token' });
        }

        // Find the user by the decoded ID in the token
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(404).send({ error: 'authmiddleware from User not found' });
        }

        // Attach the user to the request for future use in the route handler
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Check for specific error: TokenExpiredError
        if (error.name === 'TokenExpiredError') {
            console.error('JWT expired:', error.message);
            return res.status(401).send({ error: 'Token has expired, please login again' });
        }

        // Catch and log other JWT errors
        console.error("JWT verification error:", error.message);
        return res.status(401).send({ error: 'Unauthorized: Invalid or expired token' });
    }
};

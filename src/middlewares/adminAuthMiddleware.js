
export const adminAuth = async (req, res,next) => {
    try {
        if (req.user.role == "user" && req.user.role == "seller") {
            req.user = user
        }
        next()
        return res.send('adminAtuh acces denied')
    } catch (error) {
        console.error("adminauth verification error:", error.message);
        return res.status(401).send({ error: 'Unauthorized: Invalid or expired token' });
    }
};

export const adminAuth = async (req, res,next) => {
    try {
        // let user
        if (!(req.user.role === "admin")) {
            req.user = user
            return res.send('adminAtuh acces denied')
        }
        next()
    } catch (error) {
        console.error("adminauth verification error:", error.message);
        return res.status(401).send({ error: 'Unauthorized: Invalid or expired token' });
    }
};

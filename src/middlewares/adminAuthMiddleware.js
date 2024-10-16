
export const adminAuth = async (req, res) => {
    try {
        if (req.user.role == 'user' && req.user.role == 'seller') {
            req.user = user;
        }
        return res.send('acces denied')
    } catch (error) {
        console.error("adminauth verification error:", error.message);
        return res.status(401).send({ error: 'Unauthorized: Invalid or expired token' });
    }
};

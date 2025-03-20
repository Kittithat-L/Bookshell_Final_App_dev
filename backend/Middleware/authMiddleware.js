const jwt = require("jsonwebtoken");
const User = require("../Model/users.js");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = authMiddleware;
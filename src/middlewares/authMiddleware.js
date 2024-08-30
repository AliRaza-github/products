const jwt = require('jsonwebtoken');

const verifyRole = (roles = []) => (req, res, next) => {

    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded; // Attach user info to request
        if (roles.length && roles.includes(decoded.role)) {
            return next();
        }
        res.status(403).json({ message: 'Forbidden: Insufficient role' });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};

module.exports = { verifyRole }
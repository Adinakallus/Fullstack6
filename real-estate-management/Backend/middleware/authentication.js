const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware to verify the JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user; // Attach user to the request object
        next();
    });
};

// middlewares/authorizeRole.js
const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Check if user's role is allowed
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: Access is denied" });
        }

        // If user role is allowed, proceed to next middleware or route handler
        next();
    };
};

module.exports = { 
    authorizeRole,
    authenticateToken
    };



const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../db');  // MySQL connection file
const mysql = require('mysql2/promise');

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
// const authorizeRole = (...allowedRoles) => {
//     return (req, res, next) => {
//         // Check if user is authenticated
//         if (!req.user) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }

//         // Check if user's role is allowed
//         if (!allowedRoles.includes(req.user.role)) {
//             console.log("req:", req);
            
//             return res.status(403).json({ message: "Forbidden: Access is denied" });
//         }

//         // If user role is allowed, proceed to next middleware or route handler
//         next();
//     };
// };
const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            console.log("id:", req.user.id);

            // Check if user is authenticated
            if (!req.user.id) {
                return res.status(401).json({ message: "Unauthorized: No user ID" });
            }

            // Fetch user role from the database using the user ID
            db.query('SELECT role_id FROM users WHERE id = ?', [req.user.id], (err, results) => {
                if (err) {
                    console.error('Error querying database:', err.message);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                // If no user is found with that ID, return unauthorized
                if (results.length === 0) {
                    return res.status(401).json({ message: "Unauthorized: User not found" });
                }
                console.log("user:", results[0])
                const userRole = results[0].role_id;

                // Check if user's role is allowed
                if (!allowedRoles.includes(userRole)) {
                    return res.status(403).json({ message: "Forbidden: Access is denied" });
                }

                // Attach user role to request (optional)
                req.user.role_id = userRole;

                // If user role is allowed, proceed to the next middleware or route handler
                next();
            });
        } catch (error) {
            console.error('Error authorizing role:', error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
};



module.exports = { 
    authorizeRole,
    authenticateToken
    };



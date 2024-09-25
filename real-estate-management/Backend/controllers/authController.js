const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db'); // Assuming you're using MySQL with `mysql2`

// User login controller
const loginUser = (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Server error' });
        if (results.length === 0) return res.status(400).json({ error: 'User not found' });

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate a token with user's info (id and role)
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    });
};

// User registration controller
const registerUser = async (req, res) => {
    const { name, email, password, role_id } = req.body;
    console.log("register user function");
    
    console.log(`${name}, ${email}, ${password}, ${role_id}`);

    // Validate required fields
    if (!name || !email || !password ||!role_id) {
        return res.status(400).json({ error: 'Please provide name, email, password and role' });
    }

    try {
        // Check if user already exists
        const queryCheckUser = 'SELECT * FROM users WHERE email = ?';
        db.query(queryCheckUser, [email], async (err, results) => {
            if (err) return res.status(500).json({ error: 'Server error' });
            if (results.length > 0) return res.status(400).json({ error: 'User already exists' });

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user into database
            const queryInsertUser = 'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)';
            db.query(queryInsertUser, [name, email, hashedPassword, role_id], (err, result) => {
                if (err) return res.status(500).json({ error: 'Error registering user' });

                // Generate a token after successful registration
                const token = jwt.sign({ id: result.insertId, role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.status(201).json({ message: 'User registered successfully', token });
            });
        });
    } catch (err) {
        res.status(500).json({ error: 'Error processing request' });
    }
};

module.exports = {
    loginUser,
    registerUser
};

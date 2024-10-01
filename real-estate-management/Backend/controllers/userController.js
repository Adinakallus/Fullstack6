const db = require('../db');
const bcrypt = require('bcrypt');

// Create a new user
const createUser = async (req, res) => {
    const { name, email, password, role_id } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role_id], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ id: result.insertId, name, email, role_id });
            });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
const getAllUsers = (req, res) => {
    db.query('SELECT id, name, email, role_id FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get user by ID
const getUserById = (req, res) => {    
    const { id } = req.params;
    console.log("getUserbyid, :", id);

    db.query('SELECT id, name, email, role_id FROM users WHERE id = ?', [id], (err, results) => {
        console.log(results[0])

        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    });
};

// Update user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role_id } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('UPDATE users SET name = ?, email = ?, password = ?, role_id = ? WHERE id = ?',
            [name, email, hashedPassword, role_id, id], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: 'User updated' });
            });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user
const deleteUser = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted' });
    });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};

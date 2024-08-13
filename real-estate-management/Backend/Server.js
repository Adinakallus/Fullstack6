const express = require('express');
const app = express();
const db = require('./db');  // MySQL connection file

app.use(express.json());  // To parse JSON bodies


//#region PROPERTIES
// Get all properties with associated features, images, audios, and videos
app.get('/properties', (req, res) => {
    db.query(`
        SELECT p.*, f.feature_name, f.feature_value, i.image_path, a.audio_path, v.video_path
        FROM Properties p
        LEFT JOIN property_features f ON p.id = f.property_id
        LEFT JOIN property_images i ON p.id = i.property_id
        LEFT JOIN property_audios a ON p.id = a.property_id
        LEFT JOIN property_videos v ON p.id = v.property_id
    `, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get a specific property by ID with all details
app.get('/properties/:id', (req, res) => {
    const { id } = req.params;
    db.query(`
        SELECT p.*, f.feature_name, f.feature_value, i.image_path, a.audio_path, v.video_path
        FROM Properties p
        LEFT JOIN property_features f ON p.id = f.property_id
        LEFT JOIN property_images i ON p.id = i.property_id
        LEFT JOIN property_audios a ON p.id = a.property_id
        LEFT JOIN property_videos v ON p.id = v.property_id
        WHERE p.id = ?
    `, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Property not found' });
        res.json(results);
    });
});

// Add a new property with initial details (no features, images, audios, or videos)
app.post('/properties', (req, res) => {
    const { user_id, name, location, price, description, manager_id } = req.body;
    db.query('INSERT INTO Properties (user_id, name, location, price, description, manager_id) VALUES (?, ?, ?, ?, ?, ?)',
        [user_id, name, location, price, description, manager_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, ...req.body });
        });
});

// Update a property
app.put('/properties/:id', (req, res) => {
    const { id } = req.params;
    const { name, location, price, description, manager_id } = req.body;
    db.query('UPDATE Properties SET name = ?, location = ?, price = ?, description = ?, manager_id = ? WHERE id = ?',
        [name, location, price, description, manager_id, id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Property updated' });
        });
});

// Delete a property
app.delete('/properties/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Properties WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Property deleted' });
    });
});

// Add a feature to a property
app.post('/properties/:id/features', (req, res) => {
    const { id } = req.params;
    const { feature_name, feature_value } = req.body;
    db.query('INSERT INTO property_features (property_id, feature_name, feature_value) VALUES (?, ?, ?)',
        [id, feature_name, feature_value], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, property_id: id, feature_name, feature_value });
        });
});

// Add an image to a property
app.post('/properties/:id/images', (req, res) => {
    const { id } = req.params;
    const { image_path } = req.body;
    db.query('INSERT INTO property_images (property_id, image_path) VALUES (?, ?)',
        [id, image_path], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, property_id: id, image_path });
        });
});

// Add an audio file to a property
app.post('/properties/:id/audios', (req, res) => {
    const { id } = req.params;
    const { audio_path } = req.body;
    db.query('INSERT INTO property_audios (property_id, audio_path) VALUES (?, ?)',
        [id, audio_path], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, property_id: id, audio_path });
        });
});

// Add a video to a property
app.post('/properties/:id/videos', (req, res) => {
    const { id } = req.params;
    const { video_path } = req.body;
    db.query('INSERT INTO property_videos (property_id, video_path) VALUES (?, ?)',
        [id, video_path], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, property_id: id, video_path });
        });
});
//#endregion

//#region USER
// Get all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get a specific user by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
});

// Add a new user
app.post('/users', (req, res) => {
    const { name, email, password, role_id } = req.body;
    db.query('INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
        [name, email, password, role_id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, name, email, role_id });
        });
});

// Update a user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password, role_id } = req.body;
    db.query('UPDATE users SET name = ?, email = ?, password = ?, role_id = ? WHERE id = ?',
        [name, email, password, role_id, id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'User updated' });
        });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted' });
    });
});

// Authenticate a user (login)
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
        res.json(results[0]);
    });
});

//#endregion
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

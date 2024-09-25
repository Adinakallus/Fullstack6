const db = require('../db');

// Create property
const createProperty = (req, res) => {
    const { name, location, price, description, manager_id } = req.body;
    const query = 'INSERT INTO properties (name, location, price, description, manager_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, location, price, description, manager_id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to create property' });
        res.status(201).json({ id: result.insertId });
    });
};

// Get all properties
const getAllProperties = (req, res) => {
    const query = `
        SELECT p.*, 
        JSON_ARRAYAGG(JSON_OBJECT('id', pf.id, 'name', pf.feature_name, 'value', pf.feature_value)) AS features,
        JSON_ARRAYAGG(JSON_OBJECT('id', pi.id, 'path', pi.image_path)) AS images,
        JSON_ARRAYAGG(JSON_OBJECT('id', pv.id, 'path', pv.video_path)) AS videos,
        JSON_ARRAYAGG(JSON_OBJECT('id', pa.id, 'path', pa.audio_path)) AS audios
        FROM properties p
        LEFT JOIN property_features pf ON p.id = pf.property_id
        LEFT JOIN property_images pi ON p.id = pi.property_id
        LEFT JOIN property_videos pv ON p.id = pv.property_id
        LEFT JOIN property_audios pa ON p.id = pa.property_id
        GROUP BY p.id`;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch properties' });
        res.json(results);
    });
};

// Get single property
const getPropertyById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM properties WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch property' });
        if (results.length === 0) return res.status(404).json({ error: 'Property not found' });
        res.json(results[0]);
    });
};

// Update property
const updateProperty = (req, res) => {
    const { id } = req.params;
    const { name, location, price, description, manager_id } = req.body;
    const query = 'UPDATE properties SET name = ?, location = ?, price = ?, description = ?, manager_id = ? WHERE id = ?';
    db.query(query, [name, location, price, description, manager_id, id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update property' });
        res.json({ message: 'Property updated successfully' });
    });
};

// Delete property
const deleteProperty = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM properties WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete property' });
        res.json({ message: 'Property deleted successfully' });
    });
};

module.exports = {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty
};

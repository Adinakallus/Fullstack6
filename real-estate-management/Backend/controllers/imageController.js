const db = require('../db');

// Add a new image to a property
const addImage = (req, res) => {
    const { property_id, image_path } = req.body;
    const query = 'INSERT INTO property_images (property_id, image_path) VALUES (?, ?)';
    db.query(query, [property_id, image_path], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to add image' });
        res.status(201).json({ id: result.insertId, property_id, image_path });
    });
};

// Get all images for a property
const getImagesByPropertyId = (req, res) => {
    const { property_id } = req.params;
    const query = 'SELECT * FROM property_images WHERE property_id = ?';
    db.query(query, [property_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch images' });
        res.json(results);
    });
};

// Delete an image by ID
const deleteImage = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM property_images WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete image' });
        res.json({ message: 'Image deleted successfully' });
    });
};

module.exports = {
    addImage,
    getImagesByPropertyId,
    deleteImage
};

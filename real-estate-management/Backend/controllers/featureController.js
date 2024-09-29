const db = require('../db');

// Add or update feature
const addOrUpdateFeature = (req, res) => {
    const { id } = req.params;
    const { feature_name, feature_value } = req.body;
    const query = `
        INSERT INTO property_features (property_id, feature_name, feature_value)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE feature_value = VALUES(feature_value)
    `;
    db.query(query, [id, feature_name, feature_value], (err,result) => {
        if (err) return res.status(500).json({ error: 'Failed to add/update feature' });
        const featureId = result.insertId || result.affectedRows > 0 ? result.insertId : null;
        console.log("feature id:", featureId);
        
        res.status(201).json({ message: 'Feature added/updated successfully',feature_id: featureId  });
    });
};

// Delete feature
const deleteFeature = (req, res) => {
    const { propertyId, featureId } = req.params;
    const query = 'DELETE FROM property_features WHERE property_id = ? AND id = ?';
    db.query(query, [propertyId, featureId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete feature' });
        res.json({ message: 'Feature deleted successfully' });
    });
};

module.exports = {
    addOrUpdateFeature,
    deleteFeature
};

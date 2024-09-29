const db = require('../db');

// Create a property
const createProperty = (req, res) => {
    const { name, location, price, description, manager_id } = req.body;
    const query = 'INSERT INTO properties (name, location, price, description, manager_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, location, price, description, manager_id], (err, result) => {
        if (err) {
            console.error('Error creating property:', err);
            res.status(500).json({ error: 'Failed to create property' });
        } else {
            res.status(201).json({ id: result.insertId });
        }
    });
};

// Get all simple properties
const getAllProperties = (req, res) => {
    const query = 'SELECT * FROM properties';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching properties:', err);
            res.status(500).json({ error: 'Failed to fetch properties' });
        } else {
            res.json(results);
        }
    });
};

// Get a single simple property by ID
const getPropertyById = (req, res) => {
    console.log("getPropertyById");

    const { id } = req.params;
    const query = 'SELECT * FROM properties WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching property:', err);
            res.status(500).json({ error: 'Failed to fetch property' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Property not found' });
        } else {
            res.json(results[0]);
        }
    });
};

// Get all properties with features, images, videos, and audios
const getAllFullProperties = (req, res) => {
    console.log("getAllFullProperties");
    
    const query = `
        SELECT 
    p.*, 
    (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', pf.id, 'name', pf.feature_name, 'value', pf.feature_value)) 
        FROM property_features pf 
        WHERE pf.property_id = p.id
    ) AS features,
    (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', pi.id, 'path', pi.image_path)) 
        FROM property_images pi 
        WHERE pi.property_id = p.id
    ) AS images,
    (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', pv.id, 'path', pv.video_path)) 
        FROM property_videos pv 
        WHERE pv.property_id = p.id
    ) AS videos,
    (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', pa.id, 'path', pa.audio_path)) 
        FROM property_audios pa 
        WHERE pa.property_id = p.id
    ) AS audios
FROM 
    properties p
GROUP BY 
    p.id;

    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching properties:', err);
            res.status(500).json({ error: 'Failed to fetch properties' });
        } else {
            res.json(results);
        }
    });
};

// Get a single full property by ID with its related features, images, videos, and audios
const getFullPropertyById = (req, res) => {
    console.log("getFullPropertyById");
    const { id } = req.params;
    const query = `
        SELECT 
    p.*, 
    (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', pf.id, 'name', pf.feature_name, 'value', pf.feature_value)) 
        FROM property_features pf 
        WHERE pf.property_id = p.id
    ) AS features,
    (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', pi.id, 'path', pi.image_path)) 
        FROM property_images pi 
        WHERE pi.property_id = p.id
    ) AS images,
    (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', pv.id, 'path', pv.video_path)) 
        FROM property_videos pv 
        WHERE pv.property_id = p.id
    ) AS videos,
    (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('id', pa.id, 'path', pa.audio_path)) 
        FROM property_audios pa 
        WHERE pa.property_id = p.id
    ) AS audios
FROM 
    properties p
GROUP BY 
    p.id;
`;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching property:', err);
            res.status(500).json({ error: 'Failed to fetch property' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Property not found' });
        } else {
            res.json(results[0]);  // Return the single property
        }
    });
};

// Update a property
const updateProperty = (req, res) => {
    const { id } = req.params;
    const { name, location, price, description, manager_id } = req.body;
    const query = 'UPDATE properties SET name = ?, location = ?, price = ?, description = ?, manager_id = ? WHERE id = ?';
    db.query(query, [name, location, price, description, manager_id, id], (err) => {
        if (err) {
            console.error('Error updating property:', err);
            res.status(500).json({ error: 'Failed to update property' });
        } else {
            res.json({ message: 'Property updated successfully' });
        }
    });
};

// Delete a property
const deleteProperty = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM properties WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error deleting property:', err);
            res.status(500).json({ error: 'Failed to delete property' });
        } else {
            res.json({ message: 'Property deleted successfully' });
        }
    });
};


// Delete a full property along with its associated features, images, videos, and audios
const deleteFullProperty = (req, res) => {
    const { id } = req.params;

    // Start a transaction to ensure that either all deletions happen, or none of them happen
    db.beginTransaction((err) => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).json({ error: 'Failed to delete property' });
        }

        // Delete property features
        const deleteFeaturesQuery = 'DELETE FROM property_features WHERE property_id = ?';
        db.query(deleteFeaturesQuery, [id], (err) => {
            if (err) {
                console.error('Error deleting property features:', err);
                return db.rollback(() => {
                    res.status(500).json({ error: 'Failed to delete property features' });
                });
            }

            // Delete property images
            const deleteImagesQuery = 'DELETE FROM property_images WHERE property_id = ?';
            db.query(deleteImagesQuery, [id], (err) => {
                if (err) {
                    console.error('Error deleting property images:', err);
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Failed to delete property images' });
                    });
                }

                // Delete property videos
                const deleteVideosQuery = 'DELETE FROM property_videos WHERE property_id = ?';
                db.query(deleteVideosQuery, [id], (err) => {
                    if (err) {
                        console.error('Error deleting property videos:', err);
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Failed to delete property videos' });
                        });
                    }

                    // Delete property audios
                    const deleteAudiosQuery = 'DELETE FROM property_audios WHERE property_id = ?';
                    db.query(deleteAudiosQuery, [id], (err) => {
                        if (err) {
                            console.error('Error deleting property audios:', err);
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Failed to delete property audios' });
                            });
                        }

                        // Finally, delete the property itself
                        const deletePropertyQuery = 'DELETE FROM properties WHERE id = ?';
                        db.query(deletePropertyQuery, [id], (err) => {
                            if (err) {
                                console.error('Error deleting property:', err);
                                return db.rollback(() => {
                                    res.status(500).json({ error: 'Failed to delete property' });
                                });
                            }

                            // Commit the transaction if everything is successful
                            db.commit((err) => {
                                if (err) {
                                    console.error('Error committing transaction:', err);
                                    return db.rollback(() => {
                                        res.status(500).json({ error: 'Failed to delete property' });
                                    });
                                }
                                res.json({ message: 'Property and all associated data deleted successfully' });
                            });
                        });
                    });
                });
            });
        });
    });
};


    


module.exports = {
    createProperty,
    getAllProperties,
    getAllFullProperties,
    getPropertyById,
    getFullPropertyById,
    updateProperty,
    deleteProperty,
    deleteFullProperty
};

const express = require('express');
const app = express();
const db = require('./db');  // MySQL connection file
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

//Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(express.json());  // To parse JSON bodies

//#region USER
// Create a new user
app.post('/users', async (req, res) => {
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
});

// Get all users
app.get('/users', (req, res) => {
    db.query('SELECT id, name, email, role_id FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get a specific user by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT id, name, email, role_id FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
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
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted' });
    });
});

//#endregion

//#region PROPERTIES
// Create a property
app.post('/properties', (req, res) => {
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
    

    
});

//Get all properties
// app.get('/properties', (req, res) => {
//     const query = 'SELECT * FROM properties';
    
//     db.query(query, (err, results) => {
//         if (err) {
//             console.error('Error fetching properties:', err);
//             res.status(500).json({ error: 'Failed to fetch properties' });
//         } else {
//             res.json(results);
//         }
//     });

  

//});

//Get single property based on id
app.get('/properties/:id', (req, res) => {
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
});


// Update a property
app.put('/properties/:id', (req, res) => {
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
});

// Delete a property
app.delete('/properties/:id', (req, res) => {
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
});

//#endregion

//#region FULL PROPERTY

// Get all properties with their features, images, videos, and audios

app.get('/properties', (req, res) => {

    const query = `
        SELECT 
            p.*, 
            JSON_ARRAYAGG(JSON_OBJECT('id', pf.id, 'name', pf.feature_name, 'value', pf.feature_value)) AS features,
            JSON_ARRAYAGG(JSON_OBJECT('id', pi.id, 'path', pi.image_path)) AS images,
            JSON_ARRAYAGG(JSON_OBJECT('id', pv.id, 'path', pv.video_path)) AS videos,
            JSON_ARRAYAGG(JSON_OBJECT('id', pa.id, 'path', pa.audio_path)) AS audios
        FROM 
            properties p
        LEFT JOIN 
            property_features pf ON p.id = pf.property_id
        LEFT JOIN 
            property_images pi ON p.id = pi.property_id
        LEFT JOIN 
            property_videos pv ON p.id = pv.property_id
        LEFT JOIN 
            property_audios pa ON p.id = pa.property_id
        GROUP BY 
            p.id
    `;
    db.query(query, (err, results) => {
        console.log(results)

        if (err) {
            console.log(results)
            console.error('Error fetching propertiessssssss:', err);
            res.status(500).json({ error: 'Failed to fetch propertiesssssss' });
        } else {
            res.json(results);
        }
    });

});

//Add full property with everything included
app.post('/properties/full', (req, res) => {
    const { name, location, price, description, manager_id, features, images, videos, audios } = req.body;

    // Insert the property first
    const propertyQuery = 'INSERT INTO properties (name, location, price, description, manager_id) VALUES (?, ?, ?, ?, ?)';
    db.query(propertyQuery, [name, location, price, description, manager_id], (err, result) => {
        if (err) {
            console.error('Error creating property:', err);
            return res.status(500).json({ error: 'Failed to create property' });
        }

        const propertyId = result.insertId;

        // Function to insert related data
        const insertRelatedData = (tableName, data, columns) => {
            if (!data || data.length === 0) return Promise.resolve();
            // Generate values and column list dynamically
            const values = data.map((item) => {
                // Create array of values based on column list
                const valueArray = columns.map((col) => item[col]);
                return [propertyId, ...valueArray];
            });
            const query = `INSERT INTO ${tableName} (property_id, ${columns.join(', ')}) VALUES ?`;
            return new Promise((resolve, reject) => {
                db.query(query, [values], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        };

        // Insert features, images, videos, audios if they exist
        Promise.all([
            insertRelatedData('property_features', features, ['feature_name', 'feature_value']),
            insertRelatedData('property_images', images, ['image_path']),
            insertRelatedData('property_videos', videos, ['video_path']),
            insertRelatedData('property_audios', audios, ['audio_path'])
        ])
        .then(() => {
            res.status(201).json({ message: 'Property and related data created successfully', id: propertyId });
        })
        .catch((err) => {
            console.error('Error inserting related data:', err);
            res.status(500).json({ error: 'Failed to insert related data' });
        });
    });
});


//Read a Single Full Property with All Details
app.get('/properties/full/:id', (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT 
            p.*, 
            JSON_ARRAYAGG(JSON_OBJECT('id', pf.id, 'name', pf.feature_name, 'value', pf.feature_value)) AS features,
            JSON_ARRAYAGG(JSON_OBJECT('id', pi.id, 'path', pi.image_path)) AS images,
            JSON_ARRAYAGG(JSON_OBJECT('id', pv.id, 'path', pv.video_path)) AS videos,
            JSON_ARRAYAGG(JSON_OBJECT('id', pa.id, 'path', pa.audio_path)) AS audios
        FROM 
            properties p
        LEFT JOIN 
            property_features pf ON p.id = pf.property_id
        LEFT JOIN 
            property_images pi ON p.id = pi.property_id
        LEFT JOIN 
            property_videos pv ON p.id = pv.property_id
        LEFT JOIN 
            property_audios pa ON p.id = pa.property_id
        WHERE 
            p.id = ?
        GROUP BY 
            p.id
    `;

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
});



//Update a Full Property with All Details
app.put('/properties/full/:id', (req, res) => {
    const { id } = req.params;
    const { name, location, price, description, manager_id, features, images, videos, audios } = req.body;

    const updatePropertyQuery = 'UPDATE properties SET name = ?, location = ?, price = ?, description = ?, manager_id = ? WHERE id = ?';
    db.query(updatePropertyQuery, [name, location, price, description, manager_id, id], (err) => {
        if (err) {
            console.error('Error updating property:', err);
            return res.status(500).json({ error: 'Failed to update property' });
        }

        // Delete existing features, images, videos, audios for the property
        const deleteRelatedData = (tableName) => {
            return new Promise((resolve, reject) => {
                const query = `DELETE FROM ${tableName} WHERE property_id = ?`;
                db.query(query, [id], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        };

        // Insert new features, images, videos, audios
        const insertRelatedData = (tableName, data, fields) => {
            if (!data || data.length === 0) return Promise.resolve();
            const values = data.map((item) => [id, ...fields.map((field) => item[field])]);
            const query = `INSERT INTO ${tableName} (property_id, ${fields.join(', ')}) VALUES ?`;
            return new Promise((resolve, reject) => {
                db.query(query, [values], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        };

        Promise.all([
            deleteRelatedData('property_features'),
            deleteRelatedData('property_images'),
            deleteRelatedData('property_videos'),
            deleteRelatedData('property_audios')
        ])
            .then(() => Promise.all([
                insertRelatedData('property_features', features, ['feature_name', 'feature_value']),
                insertRelatedData('property_images', images, ['image_path']),
                insertRelatedData('property_videos', videos, ['video_path']),
                insertRelatedData('property_audios', audios, ['audio_path'])
            ]))
            .then(() => {
                res.json({ message: 'Property and related data updated successfully' });
            })
            .catch((err) => {
                console.error('Error updating related data:', err);
                res.status(500).json({ error: 'Failed to update related data' });
            });
    });
});

//Delete a Full Property with All Details
app.delete('/properties/full/:id', (req, res) => {
    const { id } = req.params;

    // Delete related data first
    const deleteRelatedData = (tableName) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${tableName} WHERE property_id = ?`;
            db.query(query, [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    };

    Promise.all([
        deleteRelatedData('property_features'),
        deleteRelatedData('property_images'),
        deleteRelatedData('property_videos'),
        deleteRelatedData('property_audios')
    ])
        .then(() => {
            // Delete the property itself
            const deletePropertyQuery = 'DELETE FROM properties WHERE id = ?';
            db.query(deletePropertyQuery, [id], (err) => {
                if (err) {
                    console.error('Error deleting property:', err);
                    res.status(500).json({ error: 'Failed to delete property' });
                } else {
                    res.json({ message: 'Property and all related data deleted successfully' });
                }
            });
        })
        .catch((err) => {
            console.error('Error deleting related data:', err);
            res.status(500).json({ error: 'Failed to delete related data' });
        });
});

//#endregion


//#region PROPERTY_FEATUERS

// Add or update a feature for a property
app.post('/properties/:id/features', (req, res) => {
    const { id } = req.params;
    const { feature_name, feature_value } = req.body;
    const query = `
        INSERT INTO property_features (property_id, feature_name, feature_value)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE feature_value = VALUES(feature_value)
    `;
    db.query(query, [id, feature_name, feature_value], (err, result) => {
        if (err) {
            console.error('Error adding/updating feature:', err);
            res.status(500).json({ error: 'Failed to add/update feature' });
        } else {
            res.status(201).json({ message: 'Feature added/updated successfully' });
        }
    });
});

// Delete a feature for a property
app.delete('/properties/:propertyId/features/:featureId', (req, res) => {
    const { propertyId, featureId } = req.params;
    const query = 'DELETE FROM property_features WHERE property_id = ? AND id = ?';
    db.query(query, [propertyId, featureId], (err) => {
        if (err) {
            console.error('Error deleting feature:', err);
            res.status(500).json({ error: 'Failed to delete feature' });
        } else {
            res.json({ message: 'Feature deleted successfully' });
        }
    });
});

//#endregion

//#region PROPERTY_IMAGES

// Add or update an image for a property
app.post('/properties/:id/images', (req, res) => {
    const { id } = req.params;
    const { image_path } = req.body;
    const query = `
        INSERT INTO property_images (property_id, image_path)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE image_path = VALUES(image_path)
    `;
    db.query(query, [id, image_path], (err, result) => {
        if (err) {
            console.error('Error adding/updating image:', err);
            res.status(500).json({ error: 'Failed to add/update image' });
        } else {
            res.status(201).json({ message: 'Image added/updated successfully' });
        }
    });
});

// Delete an image for a property
app.delete('/properties/:propertyId/images/:imageId', (req, res) => {
    const { propertyId, imageId } = req.params;
    const query = 'DELETE FROM property_images WHERE property_id = ? AND id = ?';
    db.query(query, [propertyId, imageId], (err) => {
        if (err) {
            console.error('Error deleting image:', err);
            res.status(500).json({ error: 'Failed to delete image' });
        } else {
            res.json({ message: 'Image deleted successfully' });
        }
    });
});

//#endregion

//#region PROPERTY_VIDEOS
// Add or update a video for a property
app.post('/properties/:id/videos', (req, res) => {
    const { id } = req.params;
    const { video_path } = req.body;
    const query = `
        INSERT INTO property_videos (property_id, video_path)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE video_path = VALUES(video_path)
    `;
    db.query(query, [id, video_path], (err, result) => {
        if (err) {
            console.error('Error adding/updating video:', err);
            res.status(500).json({ error: 'Failed to add/update video' });
        } else {
            res.status(201).json({ message: 'Video added/updated successfully' });
        }
    });
});

// Delete a video for a property
app.delete('/properties/:propertyId/videos/:videoId', (req, res) => {
    const { propertyId, videoId } = req.params;
    const query = 'DELETE FROM property_videos WHERE property_id = ? AND id = ?';
    db.query(query, [propertyId, videoId], (err) => {
        if (err) {
            console.error('Error deleting video:', err);
            res.status(500).json({ error: 'Failed to delete video' });
        } else {
            res.json({ message: 'Video deleted successfully' });
        }
    });
});

//#endregion

//#region PROPERTY_AUDIO
// Add or update an audio for a property
app.post('/properties/:id/audios', (req, res) => {
    const { id } = req.params;
    const { audio_path } = req.body;
    const query = `
        INSERT INTO property_audios (property_id, audio_path)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE audio_path = VALUES(audio_path)
    `;
    db.query(query, [id, audio_path], (err, result) => {
        if (err) {
            console.error('Error adding/updating audio:', err);
            res.status(500).json({ error: 'Failed to add/update audio' });
        } else {
            res.status(201).json({ message: 'Audio added/updated successfully' });
        }
    });
});

// Delete an audio for a property
app.delete('/properties/:propertyId/audios/:audioId', (req, res) => {
    const { propertyId, audioId } = req.params;
    const query = 'DELETE FROM property_audios WHERE property_id = ? AND id = ?';
    db.query(query, [propertyId, audioId], (err) => {
        if (err) {
            console.error('Error deleting audio:', err);
            res.status(500).json({ error: 'Failed to delete audio' });
        } else {
            res.json({ message: 'Audio deleted successfully' });
        }
    });
});

//#endregion

//#region APPLICATIONS
//#endregion

//#region MESSAGES
//#endregion


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const app = express();
const db = require('./db');  // MySQL connection file
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertiesRoutes');
const featureRoutes = require('./routes/featureRoutes');
const imageRoutes= require('./routes/imageRoutes');
const videoRoutes=require('./routes/videoRoutes');
const authRouter=require('./routes/authRouter');


//Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(express.json());  // To parse JSON bodies

app.use(userRoutes);
app.use(propertyRoutes);
app.use(featureRoutes);
app.use(imageRoutes);
app.use(videoRoutes);
app.use('/api/auth', authRouter);


/*
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


//#region APPLICATIONS
//#endregion

//#region MESSAGES
//#endregion
*/

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

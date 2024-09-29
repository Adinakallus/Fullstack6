


// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken,authorizeRole } = require('../middleware/authentication');
const propertyController = require('../controllers/propertyController');
// Protect routes to allow only property managers to add, edit, delete properties
router.get('/properties', propertyController.getAllProperties);
//get  all full properties-with all features, images,and videos that belong to them:
router.get('/properties/full', propertyController.getAllFullProperties);
//get   full property-with all features, images,and videos that belongs to it:
router.get('/properties/full/:id', propertyController.getFullPropertyById);
router.get('/properties/:id', propertyController.getPropertyById);

router.post('/properties/create', authenticateToken, authorizeRole('property_manager'), propertyController.createProperty);
router.put('/properties/update/:id', authenticateToken, authorizeRole('property_manager'), propertyController.updateProperty);
router.delete('/properties/delete/:id', authenticateToken, authorizeRole('property_manager'), propertyController.deleteProperty);
// Delete a full property along with its associated features, images, videos, and audios
router.delete('/properties/full/:id', authenticateToken, authorizeRole('property_manager'),propertyController.deleteFullProperty);




module.exports = router;




// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken,authorizeRole } = require('../middleware/authentication');
const propertyController = require('../controllers/propertyController');

// Protect routes to allow only property managers to add, edit, delete properties
router.get('/properties', propertyController.getAllProperties);
router.get('/properties/:id', propertyController.getPropertyById);
router.post('/create', authenticateToken, authorizeRole('property_manager'), propertyController.createProperty);
router.put('/update/:id', authenticateToken, authorizeRole('property_manager'), propertyController.updateProperty);
router.delete('/delete/:id', authenticateToken, authorizeRole('property_manager'), propertyController.deleteProperty);

module.exports = router;

const express = require('express');
const featureController = require('../controllers/featureController');
const router = express.Router();

router.post('/properties/:id/features', featureController.addOrUpdateFeature);
router.delete('/properties/:propertyId/features/:featureId', featureController.deleteFeature);

module.exports = router;

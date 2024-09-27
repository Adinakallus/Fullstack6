const express = require('express');
const imageController = require('../controllers/imageController');
const router = express.Router();

router.post('/properties/:property_id/images', imageController.addImage);
router.get('/properties/:property_id/images', imageController.getImagesByPropertyId);
router.delete('/images/:id', imageController.deleteImage);

module.exports = router;

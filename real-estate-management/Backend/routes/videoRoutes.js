const express = require('express');
const videoController = require('../controllers/videoController');
const router = express.Router();

router.post('/properties/:property_id/videos', videoController.addVideo);
router.get('/properties/:property_id/videos', videoController.getVideosByPropertyId);
router.delete('/videos/:id', videoController.deleteVideo);

module.exports = router;

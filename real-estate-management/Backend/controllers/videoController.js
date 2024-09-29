const db = require('../db');

// Add a new video to a property
const addVideo = (req, res) => {
    const { property_id, video_path } = req.body;
    const query = 'INSERT INTO property_videos (property_id, video_path) VALUES (?, ?)';
    db.query(query, [property_id, video_path], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to add video' });
        res.status(201).json({ id: result.insertId, property_id, video_path });
    });
};

// Get all videos for a property
const getVideosByPropertyId = (req, res) => {
    const { property_id } = req.params;
    const query = 'SELECT * FROM property_videos WHERE property_id = ?';
    db.query(query, [property_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch videos' });
        res.json(results);
    });
};

// Delete a video by ID
const deleteVideo = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM property_videos WHERE id = ?';
    db.query(query, [id], (err,result) => {
        if (err) return res.status(500).json({ error: 'Failed to delete video' });
        const vidId = result.insertId || result.affectedRows > 0 ? result.insertId : null;

        res.json({ message: 'Video deleted successfully',video_id:vidId });
    });
};

module.exports = {
    addVideo,
    getVideosByPropertyId,
    deleteVideo
};

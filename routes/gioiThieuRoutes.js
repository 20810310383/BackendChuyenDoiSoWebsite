const express = require('express');
const router = express.Router();
const { getGioiThieu, updateGioiThieu, uploadMedia } = require('../controllers/gioiThieuController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public route
router.get('/', getGioiThieu);

// Protected Admin routes
router.put('/', protect, upload.single('hinhAnhDaiDien'), updateGioiThieu);
router.post('/upload-media', protect, upload.single('file'), uploadMedia);

module.exports = router;

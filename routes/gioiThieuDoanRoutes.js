const express = require('express');
const router = express.Router();
const { getGioiThieuDoan, updateGioiThieuDoan, uploadMediaDoan } = require('../controllers/gioiThieuDoanController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public route
router.get('/', getGioiThieuDoan);

// Protected Admin routes
router.put('/', protect, upload.single('hinhAnhDaiDien'), updateGioiThieuDoan);
router.post('/upload-media', protect, upload.single('file'), uploadMediaDoan);

module.exports = router;

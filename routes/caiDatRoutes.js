const express = require('express');
const router = express.Router();
const { getCaiDat, updateCaiDat } = require('../controllers/caiDatController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public route: Lấy thông tin cài đặt hệ thống (Cổng, Logo, Footer...)
router.get('/', getCaiDat);

// Protected route: Cập nhật cài đặt hệ thống (Admin / User có quyền)
router.put('/', protect, upload.single('logo'), updateCaiDat);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getPhanQuyen, updatePhanQuyen } = require('../controllers/phanQuyenController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getPhanQuyen);
router.put('/:role', protect, updatePhanQuyen);

module.exports = router;

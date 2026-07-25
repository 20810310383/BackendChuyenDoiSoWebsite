const express = require('express');
const router = express.Router();
const { getGioiThieuLanhDao, updateGioiThieuLanhDao, uploadMediaLanhDao } = require('../controllers/gioiThieuLanhDaoController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getGioiThieuLanhDao);

router.put('/', protect, upload.single('hinhAnhDaiDien'), updateGioiThieuLanhDao);

router.post('/upload-media', protect, upload.single('file'), uploadMediaLanhDao);

module.exports = router;

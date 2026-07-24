const express = require('express');
const router = express.Router();
const {
  getBaiVietList,
  getBaiVietBySlug,
  createBaiViet,
  updateBaiViet,
  deleteBaiViet,
  uploadMediaBaiViet,
  getChuyenMucList,
  createChuyenMuc,
  deleteChuyenMuc
} = require('../controllers/baiVietChiaSeController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadMedia } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/chuyen-muc', getChuyenMucList);
router.get('/', getBaiVietList);
router.get('/:slug', getBaiVietBySlug);

// Protected Admin / Staff routes
router.post('/chuyen-muc', protect, createChuyenMuc);
router.delete('/chuyen-muc/:id', protect, deleteChuyenMuc);

router.post('/', protect, upload.single('hinhAnhDaiDien'), createBaiViet);
router.put('/:id', protect, upload.single('hinhAnhDaiDien'), updateBaiViet);
router.delete('/:id', protect, deleteBaiViet);
router.post('/upload-media', protect, uploadMedia.single('file'), uploadMediaBaiViet);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getPublicBanners,
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner
} = require('../controllers/bannerController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public route: Lấy danh sách banner hiển thị ngoài Slider Trang chủ
router.get('/', getPublicBanners);

// Protected Admin routes: Quản lý banner dành cho Admin
router.get('/admin', protect, getAllBanners);
router.get('/:id', protect, getBannerById);
router.post('/', protect, upload.single('hinhAnh'), createBanner);
router.put('/:id', protect, upload.single('hinhAnh'), updateBanner);
router.delete('/:id', protect, deleteBanner);

module.exports = router;

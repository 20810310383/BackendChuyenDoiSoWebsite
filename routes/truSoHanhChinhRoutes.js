const express = require('express');
const router = express.Router();
const {
  getAllTruSo,
  getTruSoById,
  createTruSo,
  updateTruSo,
  deleteTruSo
} = require('../controllers/truSoHanhChinhController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getAllTruSo);
router.get('/:id', getTruSoById);

// Protected routes (Cần Token & Quyền Admin / NhanVien)
router.post('/', protect, authorize('admin', 'nhanvien'), upload.single('hinhAnh'), createTruSo);
router.put('/:id', protect, authorize('admin', 'nhanvien'), upload.single('hinhAnh'), updateTruSo);
router.delete('/:id', protect, authorize('admin'), deleteTruSo);

module.exports = router;

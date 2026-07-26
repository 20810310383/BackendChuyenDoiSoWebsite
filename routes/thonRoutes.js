const express = require('express');
const router = express.Router();
const {
  getAllThon,
  getThonById,
  createThon,
  updateThon,
  deleteThon,
  addCanBo,
  updateCanBo,
  deleteCanBo,
  seedSampleData,
  uploadMediaThon
} = require('../controllers/thonController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getAllThon);
router.get('/:id', getThonById);
router.post('/seed', seedSampleData);

// Protected Thôn routes
router.post('/upload-media', protect, authorize('admin', 'nhanvien'), upload.single('file'), uploadMediaThon);
router.post('/', protect, authorize('admin', 'nhanvien'), upload.single('hinhAnh'), createThon);
router.put('/:id', protect, authorize('admin', 'nhanvien'), upload.single('hinhAnh'), updateThon);
router.delete('/:id', protect, authorize('admin'), deleteThon);

// Protected Cán bộ Thôn routes
router.post('/:id/can-bo', protect, authorize('admin', 'nhanvien'), upload.single('avatar'), addCanBo);
router.put('/:id/can-bo/:canBoId', protect, authorize('admin', 'nhanvien'), upload.single('avatar'), updateCanBo);
router.delete('/:id/can-bo/:canBoId', protect, authorize('admin', 'nhanvien'), deleteCanBo);

module.exports = router;

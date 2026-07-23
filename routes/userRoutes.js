const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  updateUserStatus,
  updateUserRole,
  deleteUser,
  seedAdminUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public route seed admin
router.post('/seed-admin', seedAdminUser);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin'), getAllUsers);
router.put('/:id/status', protect, authorize('admin'), updateUserStatus);
router.put('/:id/role', protect, authorize('admin'), updateUserRole);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;

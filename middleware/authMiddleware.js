const jwt = require('jsonwebtoken');
const NguoiDung = require('../models/NguoiDung');

// Protect routes - Xác thực JWT Token
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Không có quyền truy cập. Token không tồn tại!'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await NguoiDung.findById(decoded.id).select('-matKhau');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản liên kết với token này không tồn tại!'
      });
    }

    if (!req.user.trangThai) {
      return res.status(403).json({
        success: false,
        message: 'Tài khoản của bạn đã bị khóa!'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ hoặc đã hết hạn!'
    });
  }
};

// Authorize roles - Phân quyền người dùng (admin, nhanvien, ...)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Quyền '${req.user ? req.user.role : 'Guest'}' không được truy cập tài nguyên này!`
      });
    }
    next();
  };
};

const jwt = require('jsonwebtoken');
const NguoiDung = require('../models/NguoiDung');

// Hàm tạo JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// @desc    Đăng ký tài khoản người dùng
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { hoTen, username, email, sdt, matKhau, diaChi, role } = req.body;

    if (!hoTen || !username || !email || !sdt || !matKhau) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ thông tin (Họ tên, username, email, sdt, mật khẩu)!'
      });
    }

    // Kiểm tra xem username, email hoặc sdt đã tồn tại chưa
    const existingUser = await NguoiDung.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
        { sdt: sdt.trim() }
      ]
    });

    if (existingUser) {
      let duplicateField = 'thông tin';
      if (existingUser.username === username.toLowerCase()) duplicateField = 'Username';
      else if (existingUser.email === email.toLowerCase()) duplicateField = 'Email';
      else if (existingUser.sdt === sdt.trim()) duplicateField = 'Số điện thoại';

      return res.status(400).json({
        success: false,
        message: `${duplicateField} đã được sử dụng bởi tài khoản khác!`
      });
    }

    // Gán avatar nếu có upload ảnh
    let avatarPath = '/uploads/images/default-avatar.png';
    if (req.file) {
      avatarPath = `/uploads/images/${req.file.filename}`;
    }

    // Tạo người dùng mới
    const user = await NguoiDung.create({
      hoTen,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      sdt: sdt.trim(),
      matKhau,
      diaChi: diaChi || '',
      role: role || 'nhanvien',
      avatar: avatarPath
    });

    const token = generateToken(user._id);

    // Filter out password from response
    const userObj = user.toObject();
    delete userObj.matKhau;

    res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành công!',
      token,
      data: userObj
    });
  } catch (error) {
    console.error('[Register Error]:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi đăng ký tài khoản!',
      error: error.message
    });
  }
};

// @desc    Đăng nhập (bằng SDT, Username hoặc Email)
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { loginIdentifier, username, email, sdt, matKhau } = req.body;
    
    // Hỗ trợ nhận thông qua field loginIdentifier hoặc username/email/sdt
    const account = loginIdentifier || username || email || sdt;

    if (!account || !matKhau) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập Email / SDT / Username và Mật khẩu!'
      });
    }

    const cleanAccount = account.toString().trim().toLowerCase();

    // Tìm kiếm người dùng bằng email, username hoặc số điện thoại
    const user = await NguoiDung.findOne({
      $or: [
        { email: cleanAccount },
        { username: cleanAccount },
        { sdt: account.toString().trim() }
      ]
    }).select('+matKhau');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản (Email/SDT/Username) không tồn tại!'
      });
    }

    if (!user.trangThai) {
      return res.status(403).json({
        success: false,
        message: 'Tài khoản của bạn đã bị vô hiệu hóa!'
      });
    }

    // Kiểm tra mật khẩu
    const isMatch = await user.matchPassword(matKhau);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Mật khẩu không chính xác!'
      });
    }

    const token = generateToken(user._id);

    const userObj = user.toObject();
    delete userObj.matKhau;

    res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công!',
      token,
      data: userObj
    });
  } catch (error) {
    console.error('[Login Error]:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi đăng nhập!',
      error: error.message
    });
  }
};

// @desc    Lấy thông tin người dùng đang đăng nhập
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await NguoiDung.findById(req.user._id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Không thể lấy thông tin người dùng!',
      error: error.message
    });
  }
};

// @desc    Cập nhật thông tin cá nhân
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { hoTen, diaChi, sdt, email } = req.body;
    const user = await NguoiDung.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng!'
      });
    }

    if (hoTen) user.hoTen = hoTen;
    if (diaChi !== undefined) user.diaChi = diaChi;
    if (sdt) user.sdt = sdt;
    if (email) user.email = email.toLowerCase();

    if (req.file) {
      user.avatar = `/uploads/images/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin thành công!',
      data: user
    });
  } catch (error) {
    console.error('[Update Profile Error]:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật thông tin cá nhân!',
      error: error.message
    });
  }
};

// @desc    Đổi mật khẩu
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { matKhauCu, matKhauMoi } = req.body;

    if (!matKhauCu || !matKhauMoi) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp mật khẩu cũ và mật khẩu mới!'
      });
    }

    if (matKhauMoi.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu mới phải có tối thiểu 6 ký tự!'
      });
    }

    const user = await NguoiDung.findById(req.user._id).select('+matKhau');

    const isMatch = await user.matchPassword(matKhauCu);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu cũ không chính xác!'
      });
    }

    user.matKhau = matKhauMoi;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Đổi mật khẩu thành công!'
    });
  } catch (error) {
    console.error('[Change Password Error]:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi đổi mật khẩu!',
      error: error.message
    });
  }
};

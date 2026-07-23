const NguoiDung = require('../models/NguoiDung');

// @desc    Lấy danh sách tất cả người dùng (Dành cho Admin)
// @route   GET /api/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const { keyword, role, trangThai } = req.query;
    let query = {};

    if (keyword) {
      const searchRegex = new RegExp(keyword, 'i');
      query.$or = [
        { hoTen: searchRegex },
        { username: searchRegex },
        { email: searchRegex },
        { sdt: searchRegex }
      ];
    }

    if (role) {
      query.role = role;
    }

    if (trangThai !== undefined && trangThai !== '') {
      query.trangThai = trangThai === 'true';
    }

    const users = await NguoiDung.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách người dùng!',
      error: error.message
    });
  }
};

// @desc    Phê duyệt hoặc Khóa tài khoản người dùng (Bật / Tắt trangThai)
// @route   PUT /api/users/:id/status
// @access  Private (Admin)
exports.updateUserStatus = async (req, res) => {
  try {
    const { trangThai } = req.body;
    const user = await NguoiDung.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng này!'
      });
    }

    // Không cho phép tự khóa tài khoản Admin chính mình
    if (user._id.toString() === req.user._id.toString() && trangThai === false) {
      return res.status(400).json({
        success: false,
        message: 'Bạn không thể tự vô hiệu hóa tài khoản của chính mình!'
      });
    }

    user.trangThai = trangThai !== undefined ? trangThai : !user.trangThai;
    await user.save();

    res.status(200).json({
      success: true,
      message: user.trangThai
        ? 'Đã phê duyệt / Kích hoạt tài khoản thành công!'
        : 'Đã vô hiệu hóa / Khóa tài khoản thành công!',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi thay đổi trạng thái người dùng!',
      error: error.message
    });
  }
};

// @desc    Thay đổi vai trò người dùng (role: admin, nhanvien, thongke)
// @route   PUT /api/users/:id/role
// @access  Private (Admin)
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!['admin', 'nhanvien', 'thongke'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Vai trò không hợp lệ! (Chỉ chấp nhận admin, nhanvien, thongke)'
      });
    }

    const user = await NguoiDung.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng này!'
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: `Đã thay đổi vai trò người dùng thành '${role}'!`,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi thay đổi vai trò người dùng!',
      error: error.message
    });
  }
};

// @desc    Xóa người dùng
// @route   DELETE /api/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await NguoiDung.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng cần xóa!'
      });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Bạn không thể tự xóa tài khoản của chính mình!'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Xóa tài khoản người dùng thành công!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa người dùng!',
      error: error.message
    });
  }
};

// @desc    Seed tài khoản Admin mặc định để phục vụ đăng nhập & quản lý
// @route   POST /api/users/seed-admin
// @access  Public
exports.seedAdminUser = async (req, res) => {
  try {
    let admin = await NguoiDung.findOne({ username: 'admin' });

    if (admin) {
      admin.trangThai = true;
      admin.role = 'admin';
      await admin.save();
      return res.status(200).json({
        success: true,
        message: 'Tài khoản Admin đã tồn tại và được đảm bảo kích hoạt thành công!',
        data: admin
      });
    }

    admin = await NguoiDung.create({
      hoTen: 'Quản Trị Viên Hệ Thống',
      username: 'admin',
      email: 'admin@chuyendoiso.gov.vn',
      sdt: '0900000000',
      matKhau: 'admin123456',
      role: 'admin',
      trangThai: true,
      diaChi: 'Ủy ban Nhân dân Xã'
    });

    const userObj = admin.toObject();
    delete userObj.matKhau;

    res.status(201).json({
      success: true,
      message: 'Khởi tạo tài khoản Admin mặc định (admin / admin123456) thành công!',
      data: userObj
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo tài khoản Admin mặc định!',
      error: error.message
    });
  }
};

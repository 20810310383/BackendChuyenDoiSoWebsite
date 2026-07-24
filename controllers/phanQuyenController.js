const PhanQuyen = require('../models/PhanQuyen');

const defaultPermissions = [
  {
    role: 'admin',
    caiDat: {
      dashboard: { xem: true },
      truSo: { xem: true, them: true, sua: true, xoa: true },
      thon: { xem: true, them: true, sua: true, xoa: true, quanLyCanBo: true },
      nguoiDung: { xem: true, them: true, sua: true, xoa: true, duyetTaiKhoan: true },
      banners: { xem: true, them: true, sua: true, xoa: true },
      phanQuyen: { xem: true },
      caiDatHeThong: { xem: true, sua: true },
      gioiThieu: { xem: true, sua: true }
    }
  },
  {
    role: 'nhanvien',
    caiDat: {
      dashboard: { xem: true },
      truSo: { xem: true, them: true, sua: true, xoa: false },
      thon: { xem: true, them: true, sua: true, xoa: false, quanLyCanBo: true },
      nguoiDung: { xem: false, them: false, sua: false, xoa: false, duyetTaiKhoan: false },
      banners: { xem: true, them: true, sua: true, xoa: false },
      phanQuyen: { xem: false },
      caiDatHeThong: { xem: true, sua: true },
      gioiThieu: { xem: true, sua: true }
    }
  },
  {
    role: 'thongke',
    caiDat: {
      dashboard: { xem: true },
      truSo: { xem: true, them: false, sua: false, xoa: false },
      thon: { xem: true, them: false, sua: false, xoa: false, quanLyCanBo: false },
      nguoiDung: { xem: false, them: false, sua: false, xoa: false, duyetTaiKhoan: false },
      banners: { xem: true, them: false, sua: false, xoa: false },
      phanQuyen: { xem: false },
      caiDatHeThong: { xem: true, sua: false },
      gioiThieu: { xem: true, sua: false }
    }
  }
];

// @desc    Lấy cấu hình phân quyền toàn hệ thống
// @route   GET /api/phan-quyen
// @access  Private
exports.getPhanQuyen = async (req, res) => {
  try {
    let list = await PhanQuyen.find();

    // Nếu chưa có dữ liệu, tự nạp mặc định
    if (list.length === 0) {
      list = await PhanQuyen.insertMany(defaultPermissions);
    }

    res.json({
      success: true,
      data: list
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải cấu hình phân quyền!',
      error: error.message
    });
  }
};

// @desc    Cập nhật phân quyền theo Role
// @route   PUT /api/phan-quyen/:role
// @access  Private (Admin)
exports.updatePhanQuyen = async (req, res) => {
  try {
    const { role } = req.params;
    const { caiDat } = req.body;

    if (role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Không thể sửa đổi quyền của Quản trị viên (Admin)!'
      });
    }

    let phanQuyen = await PhanQuyen.findOne({ role });

    if (!phanQuyen) {
      phanQuyen = new PhanQuyen({ role, caiDat });
    } else {
      phanQuyen.caiDat = caiDat;
    }

    await phanQuyen.save();

    res.json({
      success: true,
      message: `Cập nhật phân quyền cho vai trò [${role}] thành công!`,
      data: phanQuyen
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật phân quyền!',
      error: error.message
    });
  }
};

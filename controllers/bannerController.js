const Banner = require('../models/Banner');
const fs = require('fs');
const path = require('path');

// @desc    Lấy danh sách Banner hiển thị ngoài Trang chủ (Public - Chỉ lấy trangThai: true)
// @route   GET /api/banners
// @access  Public
exports.getPublicBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find({ trangThai: true }).sort({ createdAt: 1 });

    return res.json({
      success: true,
      count: banners.length,
      data: banners
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Lấy tất cả danh sách Banner dành cho Admin Quản trị
// @route   GET /api/banners/admin
// @access  Private/Admin
exports.getAllBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find().sort({ createdAt: 1 });

    return res.json({
      success: true,
      count: banners.length,
      data: banners
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Lấy chi tiết 1 Banner theo ID
// @route   GET /api/banners/:id
// @access  Private/Admin
exports.getBannerById = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy Banner yêu cầu!'
      });
    }

    return res.json({
      success: true,
      data: banner
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Tạo Banner Slider mới
// @route   POST /api/banners
// @access  Private/Admin
exports.createBanner = async (req, res, next) => {
  try {
    const { tieuDe, moTa, duongDan, thuTu, trangThai } = req.body;

    let hinhAnhUrl = '';
    if (req.file) {
      hinhAnhUrl = `/uploads/images/${req.file.filename}`;
    } else if (req.body.hinhAnh) {
      hinhAnhUrl = req.body.hinhAnh;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng tải lên hình ảnh banner!'
      });
    }

    const newBanner = await Banner.create({
      tieuDe,
      moTa: moTa || '',
      hinhAnh: hinhAnhUrl,
      duongDan: duongDan || '',
      thuTu: thuTu !== undefined ? Number(thuTu) : 0,
      trangThai: trangThai !== undefined ? (trangThai === 'true' || trangThai === true) : true
    });

    return res.status(201).json({
      success: true,
      message: 'Thêm Banner Slider mới thành công!',
      data: newBanner
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cập nhật Banner
// @route   PUT /api/banners/:id
// @access  Private/Admin
exports.updateBanner = async (req, res, next) => {
  try {
    let banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy Banner cần cập nhật!'
      });
    }

    const updateFields = { ...req.body };

    // Nếu có file ảnh mới
    if (req.file) {
      // Xóa file ảnh cũ nếu tồn tại
      if (banner.hinhAnh && banner.hinhAnh.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '../public', banner.hinhAnh);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateFields.hinhAnh = `/uploads/images/${req.file.filename}`;
    }

    if (updateFields.thuTu !== undefined) {
      updateFields.thuTu = Number(updateFields.thuTu);
    }
    if (updateFields.trangThai !== undefined) {
      updateFields.trangThai = (updateFields.trangThai === 'true' || updateFields.trangThai === true);
    }

    banner = await Banner.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true
    });

    return res.json({
      success: true,
      message: 'Cập nhật Banner thành công!',
      data: banner
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Xóa Banner
// @route   DELETE /api/banners/:id
// @access  Private/Admin
exports.deleteBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy Banner cần xóa!'
      });
    }

    // Xóa file ảnh trên ổ đĩa nếu là file upload nội bộ
    if (banner.hinhAnh && banner.hinhAnh.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '../public', banner.hinhAnh);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await banner.deleteOne();

    return res.json({
      success: true,
      message: 'Xóa Banner thành công!'
    });
  } catch (error) {
    next(error);
  }
};

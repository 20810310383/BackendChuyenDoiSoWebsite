const GioiThieuDoan = require('../models/GioiThieuDoan');

// @desc    Lấy nội dung bài viết Giới thiệu BCH Đoàn xã (Public)
// @route   GET /api/gioi-thieu-doan
// @access  Public
exports.getGioiThieuDoan = async (req, res, next) => {
  try {
    let item = await GioiThieuDoan.findOne();
    if (!item) {
      item = await GioiThieuDoan.create({});
    } else {
      // Tăng lượt xem
      item.luotXem = (item.luotXem || 0) + 1;
      await item.save();
    }

    return res.json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cập nhật nội dung trang Giới thiệu BCH Đoàn xã (Admin)
// @route   PUT /api/gioi-thieu-doan
// @access  Private (Admin / Authorized)
exports.updateGioiThieuDoan = async (req, res, next) => {
  try {
    let item = await GioiThieuDoan.findOne();
    if (!item) {
      item = new GioiThieuDoan({});
    }

    const { tieuDe, tomTat, noiDung, hinhAnhDaiDien } = req.body;

    if (tieuDe) item.tieuDe = tieuDe;
    if (tomTat !== undefined) item.tomTat = tomTat;
    if (noiDung !== undefined) item.noiDung = noiDung;
    if (hinhAnhDaiDien) item.hinhAnhDaiDien = hinhAnhDaiDien;

    // Nếu người dùng upload ảnh đại diện bài viết
    if (req.file) {
      item.hinhAnhDaiDien = `/uploads/images/${req.file.filename}`;
    }

    await item.save();

    return res.json({
      success: true,
      message: 'Cập nhật trang Giới thiệu BCH, BTV Đoàn xã thành công!',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload Ảnh / Video từ Editor TinyMCE
// @route   POST /api/gioi-thieu-doan/upload-media
// @access  Private (Admin)
exports.uploadMediaDoan = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn tập tin ảnh hoặc video để tải lên!'
      });
    }

    const fileUrl = `/uploads/images/${req.file.filename}`;

    return res.json({
      location: fileUrl,
      url: fileUrl,
      success: true
    });
  } catch (error) {
    next(error);
  }
};

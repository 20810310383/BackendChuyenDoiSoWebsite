const GioiThieu = require('../models/GioiThieu');
const path = require('path');
const fs = require('fs');

// @desc    Lấy nội dung bài viết Giới thiệu (Public)
// @route   GET /api/gioi-thieu
// @access  Public
exports.getGioiThieu = async (req, res, next) => {
  try {
    let item = await GioiThieu.findOne();
    if (!item) {
      item = await GioiThieu.create({});
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

// @desc    Cập nhật nội dung trang Giới thiệu (Admin)
// @route   PUT /api/gioi-thieu
// @access  Private (Admin / Authorized)
exports.updateGioiThieu = async (req, res, next) => {
  try {
    let item = await GioiThieu.findOne();
    if (!item) {
      item = new GioiThieu({});
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
      message: 'Cập nhật trang Giới thiệu thành công!',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload Ảnh / Video từ Editor TinyMCE
// @route   POST /api/gioi-thieu/upload-media
// @access  Private (Admin)
exports.uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn tập tin ảnh hoặc video để tải lên!'
      });
    }

    const fileUrl = `/uploads/images/${req.file.filename}`;

    // Đáp ứng định dạng TinyMCE images_upload_handler (Đường dẫn tương đối)
    return res.json({
      location: fileUrl,
      url: fileUrl,
      success: true
    });
  } catch (error) {
    next(error);
  }
};

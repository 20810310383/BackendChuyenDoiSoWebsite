const CaiDat = require('../models/CaiDat');

// @desc    Lấy thông tin Cài đặt Hệ thống (Public)
// @route   GET /api/cai-dat
// @access  Public
exports.getCaiDat = async (req, res, next) => {
  try {
    let caiDat = await CaiDat.findOne();
    if (!caiDat) {
      caiDat = await CaiDat.create({});
    } else {
      let isUpdated = false;
      if (caiDat.heroSub === undefined) { caiDat.heroSub = caiDat.tenDonVi || 'Xã Thanh Liêm, tỉnh Ninh Bình'; isUpdated = true; }
      if (caiDat.heroDesc === undefined) { caiDat.heroDesc = 'Tra cứu thông tin nhanh chóng và chính xác.'; isUpdated = true; }
      if (caiDat.tieuDeKhuvucThon === undefined) { caiDat.tieuDeKhuvucThon = 'Tra cứu thông tin Thôn'; isUpdated = true; }
      if (caiDat.moTaKhuvucThon === undefined) { caiDat.moTaKhuvucThon = 'thôn trên địa bàn xã'; isUpdated = true; }
      if (caiDat.tieuDeKhuVucBaiViet === undefined) { caiDat.tieuDeKhuVucBaiViet = 'Tin Tức & Hoạt Động Nổi Bật'; isUpdated = true; }
      if (caiDat.moTaKhuVucBaiViet === undefined) { caiDat.moTaKhuVucBaiViet = 'Cập nhật những thông tin, chỉ đạo và hoạt động chuyển đổi số mới nhất của Đoàn xã Tân Thanh'; isUpdated = true; }
      if (caiDat.dienTichTuNhien === undefined) { caiDat.dienTichTuNhien = '23,27 km²'; isUpdated = true; }
      if (isUpdated) {
        await caiDat.save();
      }
    }

    return res.json({
      success: true,
      data: caiDat
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cập nhật Cài đặt Hệ thống
// @route   PUT /api/cai-dat
// @access  Private (Admin / Authorized Users)
exports.updateCaiDat = async (req, res, next) => {
  try {
    let caiDat = await CaiDat.findOne();
    if (!caiDat) {
      caiDat = new CaiDat({});
    }

    const fields = { ...req.body };

    // Nếu người dùng upload logo mới
    if (req.file) {
      fields.logoUrl = `/uploads/images/${req.file.filename}`;
    }

    Object.keys(fields).forEach((key) => {
      if (fields[key] !== undefined) {
        caiDat[key] = fields[key];
      }
    });

    await caiDat.save();

    return res.json({
      success: true,
      message: 'Cập nhật Cài đặt hệ thống thành công!',
      data: caiDat
    });
  } catch (error) {
    next(error);
  }
};

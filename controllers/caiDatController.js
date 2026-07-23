const CaiDat = require('../models/CaiDat');

// @desc    Lấy thông tin Cài đặt Hệ thống (Public)
// @route   GET /api/cai-dat
// @access  Public
exports.getCaiDat = async (req, res, next) => {
  try {
    let caiDat = await CaiDat.findOne();
    if (!caiDat) {
      caiDat = await CaiDat.create({});
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

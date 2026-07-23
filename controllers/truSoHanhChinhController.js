const TruSoHanhChinh = require('../models/TruSoHanhChinh');

// @desc    Lấy danh sách tất cả các Trụ sở hành chính
// @route   GET /api/tru-so-hanh-chinh
// @access  Public
exports.getAllTruSo = async (req, res) => {
  try {
    const { all } = req.query;
    const filter = all === 'true' ? {} : { trangThai: true };

    const listTruSo = await TruSoHanhChinh.find(filter).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: listTruSo.length,
      data: listTruSo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi lấy danh sách Trụ sở hành chính!',
      error: error.message
    });
  }
};

// @desc    Lấy chi tiết 1 Trụ sở hành chính theo ID
// @route   GET /api/tru-so-hanh-chinh/:id
// @access  Public
exports.getTruSoById = async (req, res) => {
  try {
    const truSo = await TruSoHanhChinh.findById(req.params.id);

    if (!truSo) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin Trụ sở hành chính này!'
      });
    }

    res.status(200).json({
      success: true,
      data: truSo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy chi tiết Trụ sở hành chính!',
      error: error.message
    });
  }
};

// @desc    Tạo mới Trụ sở hành chính (Admin/NhanVien)
// @route   POST /api/tru-so-hanh-chinh
// @access  Private (Admin / NhanVien)
exports.createTruSo = async (req, res) => {
  try {
    const {
      tenTruSo,
      moTa,
      linkGoogleMaps,
      linkChiDuong,
      diaChi,
      soDienThoai,
      toaDo,
      trangThai,
      hinhAnh,
      icon
    } = req.body;

    if (!tenTruSo) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập Tên trụ sở / cơ quan!'
      });
    }

    let hinhAnhPath = hinhAnh || '';
    if (req.file) {
      hinhAnhPath = `/uploads/images/${req.file.filename}`;
    }

    const truSoMoi = await TruSoHanhChinh.create({
      tenTruSo,
      moTa: moTa || '',
      hinhAnh: hinhAnhPath,
      linkGoogleMaps: linkGoogleMaps || '',
      linkChiDuong: linkChiDuong || '',
      diaChi: diaChi || '',
      soDienThoai: soDienThoai || '',
      toaDo: toaDo ? (typeof toaDo === 'string' ? JSON.parse(toaDo) : toaDo) : { lat: 0, lng: 0 },
      trangThai: trangThai !== undefined ? (trangThai === 'true' || trangThai === true) : true,
      icon: icon || ''
    });

    res.status(201).json({
      success: true,
      message: 'Tạo mới Trụ sở hành chính thành công!',
      data: truSoMoi
    });
  } catch (error) {
    console.error('[Create TruSo Error]:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo Trụ sở hành chính mới!',
      error: error.message
    });
  }
};

// @desc    Cập nhật Trụ sở hành chính
// @route   PUT /api/tru-so-hanh-chinh/:id
// @access  Private (Admin / NhanVien)
exports.updateTruSo = async (req, res) => {
  try {
    let truSo = await TruSoHanhChinh.findById(req.params.id);

    if (!truSo) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy Trụ sở hành chính cần cập nhật!'
      });
    }

    const updateFields = { ...req.body };

    if (updateFields.trangThai !== undefined) {
      updateFields.trangThai = updateFields.trangThai === 'true' || updateFields.trangThai === true;
    }

    if (updateFields.toaDo && typeof updateFields.toaDo === 'string') {
      updateFields.toaDo = JSON.parse(updateFields.toaDo);
    }

    if (req.file) {
      updateFields.hinhAnh = `/uploads/images/${req.file.filename}`;
    }

    truSo = await TruSoHanhChinh.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Cập nhật Trụ sở hành chính thành công!',
      data: truSo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật Trụ sở hành chính!',
      error: error.message
    });
  }
};

// @desc    Xóa Trụ sở hành chính
// @route   DELETE /api/tru-so-hanh-chinh/:id
// @access  Private (Admin)
exports.deleteTruSo = async (req, res) => {
  try {
    const truSo = await TruSoHanhChinh.findById(req.params.id);

    if (!truSo) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy Trụ sở hành chính cần xóa!'
      });
    }

    await truSo.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Xóa Trụ sở hành chính thành công!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa Trụ sở hành chính!',
      error: error.message
    });
  }
};

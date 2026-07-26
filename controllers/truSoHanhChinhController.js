const TruSoHanhChinh = require('../models/TruSoHanhChinh');
const mongoose = require('mongoose');

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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin Trụ sở hành chính này!'
      });
    }

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

// @desc    Lấy chi tiết 1 Trụ sở hành chính theo Slug (SEO-friendly)
// @route   GET /api/tru-so-hanh-chinh/slug/:slug
// @access  Public
exports.getTruSoBySlug = async (req, res) => {
  try {
    const truSo = await TruSoHanhChinh.findOne({ slug: req.params.slug });

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
      moTaChiTiet,
      linkGoogleMaps,
      linkChiDuong,
      diaChi,
      soDienThoai,
      toaDo,
      trangThai,
      hinhAnh,
      hinhAnhCo1,
      hinhAnhCo2,
      icon
    } = req.body;

    if (!tenTruSo) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập Tên trụ sở / cơ quan!'
      });
    }

    let hinhAnhPath = hinhAnh || '';
    let hinhAnhCo1Path = hinhAnhCo1 || '';
    let hinhAnhCo2Path = hinhAnhCo2 || '';

    if (req.files) {
      if (req.files.hinhAnh && req.files.hinhAnh[0]) {
        hinhAnhPath = `/uploads/images/${req.files.hinhAnh[0].filename}`;
      }
      if (req.files.hinhAnhCo1 && req.files.hinhAnhCo1[0]) {
        hinhAnhCo1Path = `/uploads/images/${req.files.hinhAnhCo1[0].filename}`;
      }
      if (req.files.hinhAnhCo2 && req.files.hinhAnhCo2[0]) {
        hinhAnhCo2Path = `/uploads/images/${req.files.hinhAnhCo2[0].filename}`;
      }
    } else if (req.file) {
      hinhAnhPath = `/uploads/images/${req.file.filename}`;
    }

    let danhSachCanBoParsed = [];
    if (req.body.danhSachCanBo) {
      try {
        danhSachCanBoParsed = typeof req.body.danhSachCanBo === 'string' ? JSON.parse(req.body.danhSachCanBo) : req.body.danhSachCanBo;
      } catch (e) {
        console.error('Error parsing danhSachCanBo:', e);
      }
    }

    // Sử dụng new + save() để pre-save hook tự sinh slug
    const truSoMoi = new TruSoHanhChinh({
      tenTruSo,
      moTa: moTa || '',
      moTaChiTiet: moTaChiTiet || '',
      danhSachCanBo: danhSachCanBoParsed,
      hinhAnh: hinhAnhPath,
      hinhAnhCo1: hinhAnhCo1Path,
      hinhAnhCo2: hinhAnhCo2Path,
      linkGoogleMaps: linkGoogleMaps || '',
      linkChiDuong: linkChiDuong || '',
      diaChi: diaChi || '',
      soDienThoai: soDienThoai || '',
      toaDo: toaDo ? (typeof toaDo === 'string' ? JSON.parse(toaDo) : toaDo) : { lat: 0, lng: 0 },
      trangThai: trangThai !== undefined ? (trangThai === 'true' || trangThai === true) : true,
      icon: icon || ''
    });
    await truSoMoi.save();

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

    // Cập nhật các trường từ body
    const fieldsToUpdate = ['tenTruSo', 'moTa', 'moTaChiTiet', 'linkGoogleMaps', 'linkChiDuong', 'diaChi', 'soDienThoai', 'icon'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        truSo[field] = req.body[field];
      }
    });

    if (req.body.danhSachCanBo !== undefined) {
      try {
        truSo.danhSachCanBo = typeof req.body.danhSachCanBo === 'string' ? JSON.parse(req.body.danhSachCanBo) : req.body.danhSachCanBo;
      } catch (e) {
        console.error('Error parsing danhSachCanBo in update:', e);
      }
    }

    if (req.body.trangThai !== undefined) {
      truSo.trangThai = req.body.trangThai === 'true' || req.body.trangThai === true;
    }

    if (req.body.toaDo) {
      truSo.toaDo = typeof req.body.toaDo === 'string' ? JSON.parse(req.body.toaDo) : req.body.toaDo;
    }

    if (req.files) {
      if (req.files.hinhAnh && req.files.hinhAnh[0]) {
        truSo.hinhAnh = `/uploads/images/${req.files.hinhAnh[0].filename}`;
      }
      if (req.files.hinhAnhCo1 && req.files.hinhAnhCo1[0]) {
        truSo.hinhAnhCo1 = `/uploads/images/${req.files.hinhAnhCo1[0].filename}`;
      }
      if (req.files.hinhAnhCo2 && req.files.hinhAnhCo2[0]) {
        truSo.hinhAnhCo2 = `/uploads/images/${req.files.hinhAnhCo2[0].filename}`;
      }
    } else if (req.file) {
      truSo.hinhAnh = `/uploads/images/${req.file.filename}`;
    }

    // Dùng save() để pre-save hook cập nhật slug khi đổi tên
    await truSo.save();

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

// @desc    Upload media (ảnh/video) cho TinyMCE Editor trong Trụ sở
// @route   POST /api/tru-so-hanh-chinh/upload-media
// @access  Private (Admin / NhanVien)
exports.uploadMediaTruSo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Chưa có tập tin nào được chọn!'
      });
    }

    const relativeUrl = `/uploads/images/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      location: relativeUrl,
      url: relativeUrl
    });
  } catch (error) {
    console.error('Lỗi upload media trụ sở:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi tải tập tin phương tiện!',
      error: error.message
    });
  }
};

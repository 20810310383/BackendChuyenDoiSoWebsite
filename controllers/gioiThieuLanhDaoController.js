const GioiThieuLanhDao = require('../models/GioiThieuLanhDao');

// @desc    Lấy nội dung trang Giới thiệu Lãnh đạo cấp trên & địa phương (Public)
// @route   GET /api/gioi-thieu-lanh-dao
// @access  Public
exports.getGioiThieuLanhDao = async (req, res, next) => {
  try {
    let item = await GioiThieuLanhDao.findOne();
    if (!item) {
      item = await GioiThieuLanhDao.create({
        danhSachCapTren: [
          { hoTen: 'Nguyễn Tiến Nam', chucVu: 'Bí thư Tỉnh đoàn', soDienThoai: '0988.123.456', ghiChu: 'Chỉ đạo toàn diện công tác Đoàn và phong trào thanh thiếu nhi tỉnh' },
          { hoTen: 'Trần Vũ Hoàng', chucVu: 'Phó Bí thư Huyện đoàn / Huyện ủy viên', soDienThoai: '0912.987.654', ghiChu: 'Phụ trách theo dõi chỉ đạo Đoàn xã' }
        ],
        danhSachDiaPhuong: [
          { hoTen: 'Lê Văn Minh', chucVu: 'Bí thư Đảng ủy xã', soDienThoai: '0977.111.222', ghiChu: 'Chỉ đạo toàn diện công tác Đảng và chính quyền địa phương' },
          { hoTen: 'Phạm Thị Mai', chucVu: 'Phó Bí thư Thường trực Đảng ủy / Chủ tịch HĐND xã', soDienThoai: '0983.333.444', ghiChu: 'Phụ trách công tác xây dựng Đảng và HĐND' },
          { hoTen: 'Đỗ Đức Thắng', chucVu: 'Phó Bí thư Đảng ủy / Chủ tịch UBND xã', soDienThoai: '0916.555.666', ghiChu: 'Chỉ đạo điều hành công tác UBND xã' }
        ]
      });
    } else {
      let isUpdated = false;
      if (!item.danhSachCapTren || item.danhSachCapTren.length === 0) {
        item.danhSachCapTren = [
          { hoTen: 'Nguyễn Tiến Nam', chucVu: 'Bí thư Tỉnh đoàn', soDienThoai: '0988.123.456', ghiChu: 'Chỉ đạo toàn diện công tác Đoàn và phong trào thanh thiếu nhi tỉnh' },
          { hoTen: 'Trần Vũ Hoàng', chucVu: 'Phó Bí thư Huyện đoàn / Huyện ủy viên', soDienThoai: '0912.987.654', ghiChu: 'Phụ trách theo dõi chỉ đạo Đoàn xã' }
        ];
        isUpdated = true;
      }

      if (!item.danhSachDiaPhuong || item.danhSachDiaPhuong.length === 0) {
        item.danhSachDiaPhuong = [
          { hoTen: 'Lê Văn Minh', chucVu: 'Bí thư Đảng ủy xã', soDienThoai: '0977.111.222', ghiChu: 'Chỉ đạo toàn diện công tác Đảng và chính quyền địa phương' },
          { hoTen: 'Phạm Thị Mai', chucVu: 'Phó Bí thư Thường trực Đảng ủy / Chủ tịch HĐND xã', soDienThoai: '0983.333.444', ghiChu: 'Phụ trách công tác xây dựng Đảng và HĐND' },
          { hoTen: 'Đỗ Đức Thắng', chucVu: 'Phó Bí thư Đảng ủy / Chủ tịch UBND xã', soDienThoai: '0916.555.666', ghiChu: 'Chỉ đạo điều hành công tác UBND xã' }
        ];
        isUpdated = true;
      }

      // Tăng lượt xem
      item.luotXem = (item.luotXem || 0) + 1;
      if (isUpdated) {
        await item.save();
      }
    }

    return res.json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cập nhật nội dung trang Giới thiệu Lãnh đạo cấp trên & địa phương (Admin)
// @route   PUT /api/gioi-thieu-lanh-dao
// @access  Private (Admin)
exports.updateGioiThieuLanhDao = async (req, res, next) => {
  try {
    let item = await GioiThieuLanhDao.findOne();
    if (!item) {
      item = new GioiThieuLanhDao({});
    }

    const {
      tieuDe,
      tomTat,
      noiDung,
      hinhAnhDaiDien,
      danhSachCapTren,
      danhSachDiaPhuong,
      tieuDeCapTren,
      moTaCapTren,
      tieuDeDiaPhuong,
      moTaDiaPhuong
    } = req.body;

    if (tieuDe) item.tieuDe = tieuDe;
    if (tomTat !== undefined) item.tomTat = tomTat;
    if (noiDung !== undefined) item.noiDung = noiDung;
    if (hinhAnhDaiDien) item.hinhAnhDaiDien = hinhAnhDaiDien;
    if (tieuDeCapTren !== undefined) item.tieuDeCapTren = tieuDeCapTren;
    if (moTaCapTren !== undefined) item.moTaCapTren = moTaCapTren;
    if (tieuDeDiaPhuong !== undefined) item.tieuDeDiaPhuong = tieuDeDiaPhuong;
    if (moTaDiaPhuong !== undefined) item.moTaDiaPhuong = moTaDiaPhuong;

    if (danhSachCapTren !== undefined) {
      item.danhSachCapTren = typeof danhSachCapTren === 'string' ? JSON.parse(danhSachCapTren) : danhSachCapTren;
    }
    if (danhSachDiaPhuong !== undefined) {
      item.danhSachDiaPhuong = typeof danhSachDiaPhuong === 'string' ? JSON.parse(danhSachDiaPhuong) : danhSachDiaPhuong;
    }

    if (req.file) {
      item.hinhAnhDaiDien = `/uploads/images/${req.file.filename}`;
    }

    await item.save();

    return res.json({
      success: true,
      message: 'Cập nhật trang Giới thiệu Lãnh đạo cấp trên & địa phương thành công!',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload Media từ Editor TinyMCE
// @route   POST /api/gioi-thieu-lanh-dao/upload-media
// @access  Private (Admin)
exports.uploadMediaLanhDao = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Vui lòng chọn tập tin để upload' });
    }
    const isVideo = req.file.mimetype.startsWith('video/');
    const fileUrl = isVideo
      ? `/uploads/videos/${req.file.filename}`
      : `/uploads/images/${req.file.filename}`;

    return res.json({
      success: true,
      location: fileUrl
    });
  } catch (error) {
    next(error);
  }
};

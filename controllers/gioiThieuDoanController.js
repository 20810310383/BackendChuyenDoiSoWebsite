const GioiThieuDoan = require('../models/GioiThieuDoan');

// @desc    Lấy nội dung trang Giới thiệu BCH Đoàn xã (Public)
// @route   GET /api/gioi-thieu-doan
// @access  Public
exports.getGioiThieuDoan = async (req, res, next) => {
  try {
    let item = await GioiThieuDoan.findOne();
    if (!item) {
      item = await GioiThieuDoan.create({
        danhSachBTV: [
          { hoTen: 'Nguyễn Văn Nam', chucVu: 'Bí thư Đoàn xã', soDienThoai: '0987.654.321', ghiChu: 'Phụ trách chung công tác Đoàn & phong trào thanh thiếu nhi' },
          { hoTen: 'Trần Thị Thu Hà', chucVu: 'Phó Bí thư Đoàn xã', soDienThoai: '0912.345.678', ghiChu: 'Phụ trách công tác Tuyên giáo - Tổ chức - Kiểm tra' },
          { hoTen: 'Lê Hoàng Anh', chucVu: 'Ủy viên BTV Đoàn xã', soDienThoai: '0978.112.233', ghiChu: 'Phụ trách Phong trào Tình nguyện & Chuyển đổi số' }
        ],
        danhSachBCH: [
          { hoTen: 'Phạm Văn Hùng', chucVu: 'Ủy viên BCH - Bí thư Chi đoàn Thôn Thanh Lưu', soDienThoai: '0963.222.111' },
          { hoTen: 'Vũ Thị Thanh', chucVu: 'Ủy viên BCH - Bí thư Chi đoàn Thôn Đổi Ngang', soDienThoai: '0984.333.444' },
          { hoTen: 'Đỗ Đức Cường', chucVu: 'Ủy viên BCH - Bí thư Chi đoàn Thôn Non', soDienThoai: '0915.555.666' },
          { hoTen: 'Hoàng Thị Lan', chucVu: 'Ủy viên BCH - Bí thư Chi đoàn Thôn Nam Bình', soDienThoai: '0976.777.888' },
          { hoTen: 'Nguyễn Văn Khánh', chucVu: 'Ủy viên BCH - Bí thư Chi đoàn Thôn Thanh Ninh', soDienThoai: '0988.999.000' },
          { hoTen: 'Bùi Thu Trang', chucVu: 'Ủy viên BCH - Bí thư Chi đoàn Thôn Nam Phong', soDienThoai: '0932.111.222' }
        ]
      });
    } else {
      let isUpdated = false;
      if (!item.danhSachBTV || item.danhSachBTV.length === 0) {
        item.danhSachBTV = [
          { hoTen: 'Nguyễn Văn Nam', chucVu: 'Bí thư Đoàn xã', soDienThoai: '0987.654.321', ghiChu: 'Phụ trách chung công tác Đoàn & phong trào thanh thiếu nhi' },
          { hoTen: 'Trần Thị Thu Hà', chucVu: 'Phó Bí thư Đoàn xã', soDienThoai: '0912.345.678', ghiChu: 'Phụ trách công tác Tuyên giáo - Tổ chức - Kiểm tra' },
          { hoTen: 'Lê Hoàng Anh', chucVu: 'Ủy viên BTV Đoàn xã', soDienThoai: '0978.112.233', ghiChu: 'Phụ trách Phong trào Tình nguyện & Chuyển đổi số' }
        ];
        isUpdated = true;
      }

      if (!item.danhSachBCH || item.danhSachBCH.length === 0) {
        item.danhSachBCH = [
          { hoTen: 'Phạm Văn Hùng', chucVu: 'Ủy viên BCH - Bí thư Chi đoàn Thôn Thanh Lưu', soDienThoai: '0963.222.111' },
          { hoTen: 'Vũ Thị Thanh', chucVu: 'Ủy viên BCH - Bí thư Chi đoàn Thôn Đổi Ngang', soDienThoai: '0984.333.444' },
          { hoTen: 'Đỗ Đức Cường', chucVu: 'Ủy viên BCH - Bí thư Chi đoàn Thôn Non', soDienThoai: '0915.555.666' },
          { hoTen: 'Hoàng Thị Lan', chucVu: 'Ủy viên BCH - Bí thư Chi đoàn Thôn Nam Bình', soDienThoai: '0976.777.888' },
          { hoTen: 'Nguyễn Văn Khánh', chucVu: 'Ủy viên BCH - Bí thư Chi đoàn Thôn Thanh Ninh', soDienThoai: '0988.999.000' },
          { hoTen: 'Bùi Thu Trang', chucVu: 'Ủy viên BCH - Bí thư Chi đoàn Thôn Nam Phong', soDienThoai: '0932.111.222' }
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

// @desc    Cập nhật nội dung trang Giới thiệu BCH Đoàn xã (Admin)
// @route   PUT /api/gioi-thieu-doan
// @access  Private (Admin / Authorized)
exports.updateGioiThieuDoan = async (req, res, next) => {
  try {
    let item = await GioiThieuDoan.findOne();
    if (!item) {
      item = new GioiThieuDoan({});
    }

    const { tieuDe, tomTat, noiDung, hinhAnhDaiDien, danhSachBTV, danhSachBCH, tieuDeBTV, moTaBTV, tieuDeBCH, moTaBCH } = req.body;

    if (tieuDe) item.tieuDe = tieuDe;
    if (tomTat !== undefined) item.tomTat = tomTat;
    if (noiDung !== undefined) item.noiDung = noiDung;
    if (hinhAnhDaiDien) item.hinhAnhDaiDien = hinhAnhDaiDien;
    if (tieuDeBTV !== undefined) item.tieuDeBTV = tieuDeBTV;
    if (moTaBTV !== undefined) item.moTaBTV = moTaBTV;
    if (tieuDeBCH !== undefined) item.tieuDeBCH = tieuDeBCH;
    if (moTaBCH !== undefined) item.moTaBCH = moTaBCH;
    if (danhSachBTV !== undefined) {
      item.danhSachBTV = typeof danhSachBTV === 'string' ? JSON.parse(danhSachBTV) : danhSachBTV;
    }
    if (danhSachBCH !== undefined) {
      item.danhSachBCH = typeof danhSachBCH === 'string' ? JSON.parse(danhSachBCH) : danhSachBCH;
    }

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

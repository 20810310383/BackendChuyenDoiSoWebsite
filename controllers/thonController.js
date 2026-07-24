const Thon = require('../models/Thon');

// Hàm tự động giải mã link Google Maps (kể cả link rút gọn maps.app.goo.gl) để lấy tọa độ Vĩ độ/Kinh độ chuẩn
const resolveGoogleMapsUrl = async (linkUrl) => {
  if (!linkUrl || typeof linkUrl !== 'string') return null;
  const trimmed = linkUrl.trim();
  if (!trimmed) return null;

  // 1. Kiểm tra nếu link chứa tọa độ dạng @20.489123,105.915456
  let match = trimmed.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  }

  // 2. Link chứa tọa độ chuỗi dạng 20.489123, 105.915456
  match = trimmed.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
  if (match) {
    return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  }

  // 3. Nếu là link rút gọn maps.app.goo.gl hoặc goo.gl/maps thì fetch redirect để lấy URL đầy đủ
  if (trimmed.includes('maps.app.goo.gl') || trimmed.includes('goo.gl/maps')) {
    try {
      const response = await fetch(trimmed, { method: 'GET', redirect: 'follow' });
      const finalUrl = response.url;

      match = finalUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || finalUrl.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
      if (match) {
        return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
      }
    } catch (e) {
      console.log('[Google Maps Resolver Warning]:', e.message);
    }
  }

  return null;
};

// @desc    Lấy danh sách tất cả các Thôn
// @route   GET /api/thon
// @access  Public
exports.getAllThon = async (req, res) => {
  try {
    const { all } = req.query;
    const filter = all === 'true' ? {} : { trangThai: true };

    const listThon = await Thon.find(filter).sort({ createdAt: 1 });

    // Tự động kiểm tra và giải mã tọa độ cho các thôn đã cài đặt linkGoogleMaps từ trước
    await Promise.all(
      listThon.map(async (t) => {
        if ((!t.toaDo || !t.toaDo.lat || !t.toaDo.lng) && (t.linkGoogleMaps || t.linkChiDuong)) {
          const resolved = (await resolveGoogleMapsUrl(t.linkGoogleMaps)) || (await resolveGoogleMapsUrl(t.linkChiDuong));
          if (resolved) {
            t.toaDo = resolved;
            await Thon.findByIdAndUpdate(t._id, { toaDo: resolved });
          }
        }
      })
    );

    res.status(200).json({
      success: true,
      count: listThon.length,
      data: listThon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi lấy danh sách Thôn!',
      error: error.message
    });
  }
};

// @desc    Lấy chi tiết 1 Thôn theo ID (kèm danh sách Cán bộ thôn)
// @route   GET /api/thon/:id
// @access  Public
exports.getThonById = async (req, res) => {
  try {
    const thon = await Thon.findById(req.params.id);

    if (!thon) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thông tin Thôn này!'
      });
    }

    if ((!thon.toaDo || !thon.toaDo.lat || !thon.toaDo.lng) && (thon.linkGoogleMaps || thon.linkChiDuong)) {
      const resolved = (await resolveGoogleMapsUrl(thon.linkGoogleMaps)) || (await resolveGoogleMapsUrl(thon.linkChiDuong));
      if (resolved) {
        thon.toaDo = resolved;
        await Thon.findByIdAndUpdate(thon._id, { toaDo: resolved });
      }
    }

    res.status(200).json({
      success: true,
      data: thon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy chi tiết Thôn!',
      error: error.message
    });
  }
};

// @desc    Tạo mới Thôn
// @route   POST /api/thon
// @access  Private (Admin / NhanVien)
exports.createThon = async (req, res) => {
  try {
    const {
      tenThon,
      hinhAnh,
      thonCu,
      thonGoc,
      nhaVanHoa,
      diaChiNhaVanHoa,
      soHoDan,
      danSo,
      dienTich,
      tyLeHoToanXa,
      khoangCachTrungTam,
      gioiThieu,
      linkGoogleMaps,
      linkChiDuong,
      toaDo,
      danhSachCanBo,
      trangThai
    } = req.body;

    if (!tenThon) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập Tên thôn!'
      });
    }

    let hinhAnhPath = hinhAnh || '';
    if (req.file) {
      hinhAnhPath = `/uploads/images/${req.file.filename}`;
    }

    let finalToaDo = toaDo ? (typeof toaDo === 'string' ? JSON.parse(toaDo) : toaDo) : { lat: 0, lng: 0 };
    if (!finalToaDo.lat || !finalToaDo.lng) {
      const resolved = (await resolveGoogleMapsUrl(linkGoogleMaps)) || (await resolveGoogleMapsUrl(linkChiDuong));
      if (resolved) finalToaDo = resolved;
    }

    const thonMoi = await Thon.create({
      tenThon,
      hinhAnh: hinhAnhPath,
      thonCu: thonCu || '',
      thonGoc: thonGoc || [],
      nhaVanHoa: nhaVanHoa || '',
      diaChiNhaVanHoa: diaChiNhaVanHoa || '',
      soHoDan: soHoDan ? Number(soHoDan) : 0,
      danSo: danSo ? Number(danSo) : 0,
      dienTich: dienTich ? Number(dienTich) : 0,
      tyLeHoToanXa: tyLeHoToanXa || '',
      khoangCachTrungTam: khoangCachTrungTam || '',
      gioiThieu: gioiThieu || '',
      linkGoogleMaps: linkGoogleMaps || '',
      linkChiDuong: linkChiDuong || '',
      toaDo: finalToaDo,
      danhSachCanBo: danhSachCanBo ? (typeof danhSachCanBo === 'string' ? JSON.parse(danhSachCanBo) : danhSachCanBo) : [],
      trangThai: trangThai !== undefined ? (trangThai === 'true' || trangThai === true) : true
    });

    res.status(201).json({
      success: true,
      message: 'Tạo mới Thôn thành công!',
      data: thonMoi
    });
  } catch (error) {
    console.error('[Create Thon Error]:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo mới Thôn!',
      error: error.message
    });
  }
};

// @desc    Cập nhật thông tin Thôn
// @route   PUT /api/thon/:id
// @access  Private (Admin / NhanVien)
exports.updateThon = async (req, res) => {
  try {
    let thon = await Thon.findById(req.params.id);

    if (!thon) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy Thôn cần cập nhật!'
      });
    }

    const updateFields = { ...req.body };

    if (updateFields.trangThai !== undefined) {
      updateFields.trangThai = updateFields.trangThai === 'true' || updateFields.trangThai === true;
    }

    if (req.file) {
      updateFields.hinhAnh = `/uploads/images/${req.file.filename}`;
    }

    const targetMapsLink = updateFields.linkGoogleMaps !== undefined ? updateFields.linkGoogleMaps : thon.linkGoogleMaps;
    const targetChiDuongLink = updateFields.linkChiDuong !== undefined ? updateFields.linkChiDuong : thon.linkChiDuong;

    const resolved = (await resolveGoogleMapsUrl(targetMapsLink)) || (await resolveGoogleMapsUrl(targetChiDuongLink));
    if (resolved) {
      updateFields.toaDo = resolved;
    }

    thon = await Thon.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin Thôn thành công!',
      data: thon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật Thôn!',
      error: error.message
    });
  }
};

// @desc    Xóa Thôn
// @route   DELETE /api/thon/:id
// @access  Private (Admin)
exports.deleteThon = async (req, res) => {
  try {
    const thon = await Thon.findById(req.params.id);

    if (!thon) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy Thôn cần xóa!'
      });
    }

    await thon.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Xóa Thôn thành công!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa Thôn!',
      error: error.message
    });
  }
};

// ==================== CÁN BỘ THÔN APIS ====================

// @desc    Thêm cán bộ mới vào Thôn
// @route   POST /api/thon/:id/can-bo
// @access  Private (Admin / NhanVien)
exports.addCanBo = async (req, res) => {
  try {
    const { hoTen, chucVu, soDienThoai, avatar, email, ghiChu } = req.body;

    if (!hoTen || !chucVu) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập Họ tên và Chức vụ của cán bộ!'
      });
    }

    const thon = await Thon.findById(req.params.id);
    if (!thon) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy Thôn!'
      });
    }

    let avatarPath = avatar || '';
    if (req.file) {
      avatarPath = `/uploads/images/${req.file.filename}`;
    }

    const canBoMoi = {
      hoTen,
      chucVu,
      soDienThoai: soDienThoai || '',
      avatar: avatarPath,
      email: email || '',
      ghiChu: ghiChu || ''
    };

    thon.danhSachCanBo.push(canBoMoi);
    await thon.save();

    res.status(201).json({
      success: true,
      message: 'Thêm cán bộ thôn thành công!',
      data: thon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi thêm cán bộ thôn!',
      error: error.message
    });
  }
};

// @desc    Cập nhật thông tin cán bộ thôn
// @route   PUT /api/thon/:id/can-bo/:canBoId
// @access  Private (Admin / NhanVien)
exports.updateCanBo = async (req, res) => {
  try {
    const { hoTen, chucVu, soDienThoai, avatar, email, ghiChu } = req.body;
    const thon = await Thon.findById(req.params.id);

    if (!thon) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy Thôn!'
      });
    }

    const canBo = thon.danhSachCanBo.id(req.params.canBoId);
    if (!canBo) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy Cán bộ thôn!'
      });
    }

    if (hoTen) canBo.hoTen = hoTen;
    if (chucVu) canBo.chucVu = chucVu;
    if (soDienThoai !== undefined) canBo.soDienThoai = soDienThoai;
    if (email !== undefined) canBo.email = email;
    if (ghiChu !== undefined) canBo.ghiChu = ghiChu;

    if (req.file) {
      canBo.avatar = `/uploads/images/${req.file.filename}`;
    } else if (avatar) {
      canBo.avatar = avatar;
    }

    await thon.save();

    res.status(200).json({
      success: true,
      message: 'Cập nhật cán bộ thôn thành công!',
      data: thon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật cán bộ thôn!',
      error: error.message
    });
  }
};

// @desc    Xóa cán bộ thôn
// @route   DELETE /api/thon/:id/can-bo/:canBoId
// @access  Private (Admin / NhanVien)
exports.deleteCanBo = async (req, res) => {
  try {
    const thon = await Thon.findById(req.params.id);

    if (!thon) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy Thôn!'
      });
    }

    thon.danhSachCanBo.pull(req.params.canBoId);
    await thon.save();

    res.status(200).json({
      success: true,
      message: 'Xóa cán bộ thôn thành công!',
      data: thon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa cán bộ thôn!',
      error: error.message
    });
  }
};

// @desc    Seed dữ liệu mẫu danh sách thôn & cán bộ thôn chuẩn từ hình ảnh
// @route   POST /api/thon/seed
// @access  Public
exports.seedSampleData = async (req, res) => {
  try {
    await Thon.deleteMany({});

    const sampleThon = [
      {
        tenThon: 'Thôn Tâng',
        thonCu: '1 Tâng, 2 Tâng',
        thonGoc: ['1 Tâng', '2 Tâng'],
        nhaVanHoa: 'Nhà văn hoá thôn 02 Tâng (cũ)',
        diaChiNhaVanHoa: 'Nhà văn hóa thôn 02 Tâng (cũ)',
        soHoDan: 573,
        danSo: 2060,
        tyLeHoToanXa: '8,9%',
        khoangCachTrungTam: '5,1 km',
        gioiThieu: 'Thôn Tâng được thành lập sau sáp nhập từ 1 Tâng, 2 Tâng. Thôn hiện có 573 hộ dân, trung tâm sinh hoạt cộng đồng tại Nhà văn hoá thôn 02 Tâng (cũ).',
        linkGoogleMaps: 'https://maps.google.com/?q=Nhà+văn+hoá+thôn+02+Tâng',
        linkChiDuong: 'https://www.google.com/maps/dir//Nhà+văn+hoá+thôn+02+Tâng',
        toaDo: { lat: 20.4851, lng: 105.9123 },
        danhSachCanBo: [
          {
            hoTen: 'Lương Văn Thọ',
            chucVu: 'Bí thư chi bộ',
            soDienThoai: '0379 507 305'
          },
          {
            hoTen: 'Nguyễn Văn Lai',
            chucVu: 'Trưởng thôn',
            soDienThoai: '0933 454 966'
          },
          {
            hoTen: 'Vũ Văn Dũng',
            chucVu: 'Trưởng Ban CTMT',
            soDienThoai: '0917 624 633'
          },
          {
            hoTen: 'Trần Văn Hoàng',
            chucVu: 'Phó Trưởng thôn',
            soDienThoai: '0988 123 456'
          },
          {
            hoTen: 'Phạm Thị Mai',
            chucVu: 'Chi hội trưởng Hội Phụ nữ',
            soDienThoai: '0912 345 678'
          },
          {
            hoTen: 'Đỗ Văn Cường',
            chucVu: 'Bí thư Chi đoàn thanh niên',
            soDienThoai: '0977 888 999'
          },
          {
            hoTen: 'Lê Văn Tùng',
            chucVu: 'Chi hội trưởng Hội Nông dân',
            soDienThoai: '0966 555 444'
          },
          {
            hoTen: 'Nguyễn Thị Hoa',
            chucVu: 'Chi hội trưởng Hội Cựu chiến binh',
            soDienThoai: '0944 333 222'
          },
          {
            hoTen: 'Bùi Văn Nam',
            chucVu: 'Công an viên phụ trách thôn',
            soDienThoai: '0933 222 111'
          }
        ],
        thuTu: 1,
        trangThai: true
      },
      {
        tenThon: 'Thôn Thanh Hương',
        thonCu: '3 Tâng, 4 Tâng',
        thonGoc: ['3 Tâng', '4 Tâng'],
        nhaVanHoa: 'Nhà Văn Hóa thôn 4 Tâng (cũ)',
        diaChiNhaVanHoa: 'Nhà Văn Hóa thôn 4 Tâng (cũ), Xã Thanh Liêm',
        soHoDan: 574,
        danSo: 2070,
        tyLeHoToanXa: '8,9%',
        khoangCachTrungTam: '4,8 km',
        gioiThieu: 'Thôn Thanh Hương được thành lập sau sáp nhập từ 3 Tâng, 4 Tâng. Thôn hiện có 574 hộ dân.',
        linkGoogleMaps: 'https://maps.google.com/?q=Nhà+Văn+Hóa+thôn+4+Tâng',
        linkChiDuong: 'https://www.google.com/maps/dir//Nhà+Văn+Hóa+thôn+4+Tâng',
        toaDo: { lat: 20.489, lng: 105.915 },
        danhSachCanBo: [
          {
            hoTen: 'Nguyễn Văn Minh',
            chucVu: 'Bí thư chi bộ',
            soDienThoai: '0981 111 222'
          },
          {
            hoTen: 'Hoàng Văn Đức',
            chucVu: 'Trưởng thôn',
            soDienThoai: '0972 333 444'
          }
        ],
        thuTu: 2,
        trangThai: true
      },
      {
        tenThon: 'Thôn Nội Chiều',
        thonCu: 'Lạc Nội, Lạc Chiều',
        thonGoc: ['Lạc Nội', 'Lạc Chiều'],
        nhaVanHoa: 'Nhà văn hóa thôn Lạc Nội (cũ)',
        diaChiNhaVanHoa: 'Nhà văn hóa thôn Lạc Nội (cũ), Xã Thanh Liêm',
        soHoDan: 719,
        danSo: 2590,
        tyLeHoToanXa: '11,2%',
        khoangCachTrungTam: '6,2 km',
        gioiThieu: 'Thôn Nội Chiều sáp nhập từ Lạc Nội, Lạc Chiều với 719 hộ dân.',
        linkGoogleMaps: 'https://maps.google.com/?q=Nhà+văn+hóa+thôn+Lạc+Nội',
        linkChiDuong: 'https://www.google.com/maps/dir//Nhà+văn+hóa+thôn+Lạc+Nội',
        toaDo: { lat: 20.492, lng: 105.92 },
        danhSachCanBo: [
          {
            hoTen: 'Đặng Văn Tiến',
            chucVu: 'Bí thư chi bộ',
            soDienThoai: '0915 666 777'
          },
          {
            hoTen: 'Phạm Văn Thành',
            chucVu: 'Trưởng thôn',
            soDienThoai: '0904 888 999'
          }
        ],
        thuTu: 3,
        trangThai: true
      }
    ];

    const insertedThon = await Thon.insertMany(sampleThon);

    res.status(201).json({
      success: true,
      message: 'Khởi tạo dữ liệu mẫu Danh sách thôn & Cán bộ thôn thành công!',
      count: insertedThon.length,
      data: insertedThon
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi khởi tạo dữ liệu mẫu Thôn!',
      error: error.message
    });
  }
};

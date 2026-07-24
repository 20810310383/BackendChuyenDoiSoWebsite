const BaiVietChiaSe = require('../models/BaiVietChiaSe');
const ChuyenMucBaiViet = require('../models/ChuyenMucBaiViet');
const path = require('path');
const fs = require('fs');

const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Tạo slug độc nhất
const generateUniqueSlug = async (tieuDe, currentId = null) => {
  let baseSlug = slugify(tieuDe) || 'bai-viet';
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const existing = await BaiVietChiaSe.findOne({ slug });
    if (!existing || (currentId && existing._id.toString() === currentId.toString())) {
      break;
    }
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
};

// @desc    Lấy danh sách bài viết (Có phân trang, tìm kiếm, lọc chuyên mục)
// @route   GET /api/bai-viet
// @access  Public
exports.getBaiVietList = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const { q, chuyenMuc, trangThai, all } = req.query;

    const filter = {};

    // Nếu không phải admin lấy tất cả (all=true), mặc định chỉ lấy trangThai = hienthi
    if (all !== 'true') {
      filter.trangThai = 'hienthi';
    } else if (trangThai) {
      filter.trangThai = trangThai;
    }

    if (chuyenMuc && chuyenMuc !== 'tatca') {
      filter.chuyenMuc = chuyenMuc;
    }

    if (q && q.trim()) {
      const searchRegex = new RegExp(q.trim(), 'i');
      filter.$or = [
        { tieuDe: searchRegex },
        { tomTat: searchRegex }
      ];
    }

    const total = await BaiVietChiaSe.countDocuments(filter);
    const list = await BaiVietChiaSe.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: list,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải danh sách bài viết!',
      error: error.message
    });
  }
};

// @desc    Lấy chi tiết 1 bài viết theo Slug hoặc ID
// @route   GET /api/bai-viet/:slug
// @access  Public
exports.getBaiVietBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let baiViet;

    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
      baiViet = await BaiVietChiaSe.findById(slug);
    }

    if (!baiViet) {
      baiViet = await BaiVietChiaSe.findOne({ slug });
    }

    if (!baiViet) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài viết yêu cầu!'
      });
    }

    // Tăng lượt xem
    baiViet.luotXem = (baiViet.luotXem || 0) + 1;
    await baiViet.save();

    res.json({
      success: true,
      data: baiViet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tải chi tiết bài viết!',
      error: error.message
    });
  }
};

// @desc    Tạo bài viết mới
// @route   POST /api/bai-viet
// @access  Private (Admin / Staff)
exports.createBaiViet = async (req, res) => {
  try {
    const { tieuDe, tomTat, noiDung, chuyenMuc, trangThai, tacGia } = req.body;

    if (!tieuDe || !tieuDe.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập tiêu đề bài viết!'
      });
    }

    const slug = await generateUniqueSlug(tieuDe);

    let hinhAnhDaiDien = '';
    if (req.file) {
      hinhAnhDaiDien = `/uploads/images/${req.file.filename}`;
    }

    const baiViet = new BaiVietChiaSe({
      tieuDe: tieuDe.trim(),
      slug,
      tomTat: tomTat || '',
      noiDung: noiDung || '',
      hinhAnhDaiDien,
      chuyenMuc: chuyenMuc || 'Tin tức',
      trangThai: trangThai || 'hienthi',
      tacGia: tacGia || (req.user ? req.user.hoTen || req.user.username : 'Ban Quản trị')
    });

    await baiViet.save();

    res.status(201).json({
      success: true,
      message: 'Tạo bài viết mới thành công!',
      data: baiViet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo bài viết mới!',
      error: error.message
    });
  }
};

// @desc    Cập nhật bài viết
// @route   PUT /api/bai-viet/:id
// @access  Private (Admin / Staff)
exports.updateBaiViet = async (req, res) => {
  try {
    const { id } = req.params;
    const { tieuDe, tomTat, noiDung, chuyenMuc, trangThai, tacGia } = req.body;

    let baiViet = await BaiVietChiaSe.findById(id);
    if (!baiViet) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài viết cần cập nhật!'
      });
    }

    if (tieuDe && tieuDe.trim() !== baiViet.tieuDe) {
      baiViet.tieuDe = tieuDe.trim();
      baiViet.slug = await generateUniqueSlug(tieuDe, baiViet._id);
    }

    if (tomTat !== undefined) baiViet.tomTat = tomTat;
    if (noiDung !== undefined) baiViet.noiDung = noiDung;
    if (chuyenMuc !== undefined) baiViet.chuyenMuc = chuyenMuc;
    if (trangThai !== undefined) baiViet.trangThai = trangThai;
    if (tacGia !== undefined) baiViet.tacGia = tacGia;

    if (req.file) {
      // Xóa ảnh cũ nếu có
      if (baiViet.hinhAnhDaiDien && baiViet.hinhAnhDaiDien.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '../public', baiViet.hinhAnhDaiDien);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      baiViet.hinhAnhDaiDien = `/uploads/images/${req.file.filename}`;
    }

    await baiViet.save();

    res.json({
      success: true,
      message: 'Cập nhật bài viết thành công!',
      data: baiViet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật bài viết!',
      error: error.message
    });
  }
};

// @desc    Xóa bài viết
// @route   DELETE /api/bai-viet/:id
// @access  Private (Admin / Staff)
exports.deleteBaiViet = async (req, res) => {
  try {
    const { id } = req.params;
    const baiViet = await BaiVietChiaSe.findById(id);

    if (!baiViet) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài viết cần xóa!'
      });
    }

    // Xóa ảnh đại diện
    if (baiViet.hinhAnhDaiDien && baiViet.hinhAnhDaiDien.startsWith('/uploads/')) {
      const imgPath = path.join(__dirname, '../public', baiViet.hinhAnhDaiDien);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await BaiVietChiaSe.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Đã xóa bài viết thành công!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa bài viết!',
      error: error.message
    });
  }
};

// @desc    Tải ảnh/tệp lên từ trình soạn thảo TinyMCE
// @route   POST /api/bai-viet/upload-media
// @access  Private (Admin / Staff)
exports.uploadMediaBaiViet = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Không có tệp nào được tải lên'
      });
    }
    const fileUrl = `/uploads/images/${req.file.filename}`;
    res.json({
      location: fileUrl,
      url: fileUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Tải media bài viết thất bại',
      error: error.message
    });
  }
};

// ── QUẢN LÝ CHUYÊN MỤC BÀI VIẾT ──

const DEFAULT_CATEGORIES = [
  'Tin tức',
  'Thông báo',
  'Hoạt động Đoàn',
  'Chuyển đổi số',
  'Gương điển hình',
  'Khác'
];

exports.getChuyenMucList = async (req, res) => {
  try {
    let list = await ChuyenMucBaiViet.find().sort({ createdAt: 1 });
    if (list.length === 0) {
      for (const catName of DEFAULT_CATEGORIES) {
        await ChuyenMucBaiViet.create({ tenChuyenMuc: catName });
      }
      list = await ChuyenMucBaiViet.find().sort({ createdAt: 1 });
    }
    res.json({
      success: true,
      data: list
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách chuyên mục',
      error: error.message
    });
  }
};

exports.createChuyenMuc = async (req, res) => {
  try {
    const { tenChuyenMuc } = req.body;
    if (!tenChuyenMuc || !tenChuyenMuc.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập tên chuyên mục mới!'
      });
    }
    const name = tenChuyenMuc.trim();
    const existing = await ChuyenMucBaiViet.findOne({ tenChuyenMuc: name });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Chuyên mục "${name}" đã tồn tại!`
      });
    }

    const newCat = new ChuyenMucBaiViet({ tenChuyenMuc: name });
    await newCat.save();

    res.status(201).json({
      success: true,
      message: 'Thêm chuyên mục mới thành công!',
      data: newCat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi thêm chuyên mục!',
      error: error.message
    });
  }
};

exports.deleteChuyenMuc = async (req, res) => {
  try {
    const { id } = req.params;
    const cat = await ChuyenMucBaiViet.findById(id);
    if (!cat) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy chuyên mục cần xóa!'
      });
    }

    // Kiểm tra xem có bài viết nào đang liên kết chuyên mục này không
    const count = await BaiVietChiaSe.countDocuments({ chuyenMuc: cat.tenChuyenMuc });
    if (count > 0) {
      return res.status(400).json({
        success: false,
        message: `Không thể xóa chuyên mục "${cat.tenChuyenMuc}" vì đang có ${count} bài viết liên kết!`
      });
    }

    await ChuyenMucBaiViet.findByIdAndDelete(id);

    res.json({
      success: true,
      message: `Đã xóa chuyên mục "${cat.tenChuyenMuc}" thành công!`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa chuyên mục!',
      error: error.message
    });
  }
};

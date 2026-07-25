const mongoose = require('mongoose');

const ThanhVienDoanSchema = new mongoose.Schema(
  {
    hoTen: {
      type: String,
      required: true,
      trim: true
    },
    chucVu: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String,
      default: ''
    },
    soDienThoai: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    ghiChu: {
      type: String,
      default: ''
    },
    thuTu: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const gioiThieuDoanSchema = new mongoose.Schema(
  {
    tieuDe: {
      type: String,
      required: true,
      default: 'Giới thiệu Ban Chấp hành, Ban Thường vụ Đoàn xã'
    },
    slug: {
      type: String,
      default: 'gioi-thieu-doan-xa'
    },
    tomTat: {
      type: String,
      default: 'Thông tin cơ cấu tổ chức, danh sách Ban Thường vụ và Ban Chấp hành Đoàn TNCS Hồ Chí Minh xã.'
    },
    hinhAnhDaiDien: {
      type: String,
      default: ''
    },
    tieuDeBTV: {
      type: String,
      default: 'DANH SÁCH BAN THƯỜNG VỤ ĐOÀN XÃ'
    },
    moTaBTV: {
      type: String,
      default: 'Tập thể chỉ đạo, điều hành toàn diện công tác Đoàn và phong trào thanh thiếu nhi địa phương'
    },
    tieuDeBCH: {
      type: String,
      default: 'DANH SÁCH BAN CHẤP HÀNH ĐOÀN XÃ'
    },
    moTaBCH: {
      type: String,
      default: 'Các đồng chí Ủy viên Ban Chấp hành đại diện cho các Chi đoàn thôn và bộ phận trực thuộc'
    },
    danhSachBTV: [ThanhVienDoanSchema],
    danhSachBCH: [ThanhVienDoanSchema],
    noiDung: {
      type: String,
      default: ''
    },
    luotXem: {
      type: Number,
      default: 0
    },
    trangThai: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('GioiThieuDoan', gioiThieuDoanSchema);

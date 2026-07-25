const mongoose = require('mongoose');

const ThanhVienLanhDaoSchema = new mongoose.Schema(
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

const gioiThieuLanhDaoSchema = new mongoose.Schema(
  {
    tieuDe: {
      type: String,
      required: true,
      default: 'Giới thiệu Lãnh đạo Đoàn cấp trên và Lãnh đạo địa phương'
    },
    slug: {
      type: String,
      default: 'gioi-thieu-lanh-dao'
    },
    tomTat: {
      type: String,
      default: 'Thông tin cơ cấu tổ chức, danh sách Lãnh đạo Đoàn cấp trên và Lãnh đạo địa phương.'
    },
    hinhAnhDaiDien: {
      type: String,
      default: ''
    },
    tieuDeCapTren: {
      type: String,
      default: 'DANH SÁCH LÃNH ĐẠO ĐOÀN CẤP TRÊN'
    },
    moTaCapTren: {
      type: String,
      default: 'Các đồng chí Lãnh đạo chỉ đạo, định hướng công tác Đoàn và phong trào thanh thiếu nhi địa phương'
    },
    tieuDeDiaPhuong: {
      type: String,
      default: 'DANH SÁCH LÃNH ĐẠO ĐỊA PHƯƠNG'
    },
    moTaDiaPhuong: {
      type: String,
      default: 'Tập thể Lãnh đạo Đảng ủy, HĐND, UBND, Ủy ban MTTQ Việt Nam địa phương'
    },
    danhSachCapTren: [ThanhVienLanhDaoSchema],
    danhSachDiaPhuong: [ThanhVienLanhDaoSchema],
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

module.exports = mongoose.model('GioiThieuLanhDao', gioiThieuLanhDaoSchema);

const mongoose = require('mongoose');

// Schema Cán bộ thôn (Chức vụ, Họ tên, SDT, Avatar, ...)
const CanBoThonSchema = new mongoose.Schema(
  {
    hoTen: {
      type: String,
      required: [true, 'Vui lòng nhập họ và tên cán bộ'],
      trim: true
    },
    chucVu: {
      type: String,
      required: [true, 'Vui lòng nhập chức vụ cán bộ (Ví dụ: Bí thư chi bộ, Trưởng thôn)'],
      trim: true
    },
    soDienThoai: {
      type: String,
      trim: true,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      trim: true,
      default: ''
    },
    ghiChu: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Schema Thôn / Xóm
const ThonSchema = new mongoose.Schema(
  {
    tenThon: {
      type: String,
      required: [true, 'Vui lòng nhập tên thôn'],
      trim: true
    },
    hinhAnh: {
      type: String,
      default: '' // Hình ảnh đại diện Nhà văn hóa / Thôn
    },
    thonCu: {
      type: String,
      trim: true,
      default: ''
    },
    thonGoc: [
      {
        type: String,
        trim: true
      }
    ],
    nhaVanHoa: {
      type: String,
      trim: true,
      default: ''
    },
    diaChiNhaVanHoa: {
      type: String,
      trim: true,
      default: ''
    },

    // Các thông số chỉ số thống kê của Thôn
    soHoDan: {
      type: Number,
      default: 0
    },
    danSo: {
      type: Number,
      default: 0
    },
    dienTich: {
      type: Number,
      default: 0 // Diện tích của thôn tính theo km²
    },
    tyLeHoToanXa: {
      type: String,
      trim: true,
      default: ''
    },
    khoangCachTrungTam: {
      type: String,
      trim: true,
      default: ''
    },

    // Mô tả giới thiệu
    gioiThieu: {
      type: String,
      default: ''
    },

    // Vị trí bản đồ Nhà văn hóa
    linkGoogleMaps: {
      type: String,
      trim: true,
      default: ''
    },
    linkChiDuong: {
      type: String,
      trim: true,
      default: ''
    },
    toaDo: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 }
    },

    // Danh sách cán bộ thuộc thôn
    danhSachCanBo: [CanBoThonSchema],

    thuTu: {
      type: Number,
      default: 0
    },
    trangThai: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Thon', ThonSchema);

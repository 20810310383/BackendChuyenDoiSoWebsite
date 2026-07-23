const mongoose = require('mongoose');

const TruSoHanhChinhSchema = new mongoose.Schema(
  {
    tenTruSo: {
      type: String,
      required: [true, 'Vui lòng nhập tên trụ sở / cơ quan'],
      trim: true
    },
    moTa: {
      type: String,
      trim: true,
      default: ''
    },
    hinhAnh: {
      type: String,
      default: '' // Đường dẫn hình ảnh trụ sở
    },
    icon: {
      type: String,
      default: ''
    },
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
    diaChi: {
      type: String,
      trim: true,
      default: ''
    },
    soDienThoai: {
      type: String,
      trim: true,
      default: ''
    },
    toaDo: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 }
    },
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

module.exports = mongoose.model('TruSoHanhChinh', TruSoHanhChinhSchema);

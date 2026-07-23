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
    icon: {
      type: String,
      default: '' // Đường dẫn logo / icon hiển thị
    },
    linkGoogleMaps: {
      type: String,
      trim: true,
      default: '' // Đường dẫn link bấm "Mở Google Maps"
    },
    linkChiDuong: {
      type: String,
      trim: true,
      default: '' // Đường dẫn link bấm "Chỉ đường"
    },
    diaChi: {
      type: String,
      trim: true,
      default: '' // Địa chỉ cụ thể trụ sở
    },
    soDienThoai: {
      type: String,
      trim: true,
      default: '' // Số điện thoại liên hệ khẩn cấp / hành chính
    },
    toaDo: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 }
    },
    thuTu: {
      type: Number,
      default: 0 // Thứ tự hiển thị trên giao diện
    },
    trangThai: {
      type: Boolean,
      default: true // Trạng thái hiển thị (true: Bật, false: Ẩn)
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('TruSoHanhChinh', TruSoHanhChinhSchema);

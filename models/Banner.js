const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema(
  {
    tieuDe: {
      type: String,
      default: '',
      trim: true
    },
    moTa: {
      type: String,
      trim: true,
      default: ''
    },
    hinhAnh: {
      type: String,
      required: [true, 'Vui lòng tải lên hình ảnh banner'],
      trim: true
    },
    duongDan: {
      type: String,
      trim: true,
      default: '' // Đường dẫn liên kết khi người dùng nhấp vào banner (Optional)
    },
    thuTu: {
      type: Number,
      default: 0 // Thứ tự sắp xếp hiển thị trên Slider (0, 1, 2...)
    },
    trangThai: {
      type: Boolean,
      default: true // true: Hiển thị ngoài Trang chủ, false: Ẩn
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Banner', BannerSchema);

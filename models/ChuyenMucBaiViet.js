const mongoose = require('mongoose');

const chuyenMucBaiVietSchema = new mongoose.Schema(
  {
    tenChuyenMuc: {
      type: String,
      required: [true, 'Vui lòng nhập tên chuyên mục'],
      unique: true,
      trim: true
    },
    moTa: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChuyenMucBaiViet', chuyenMucBaiVietSchema);

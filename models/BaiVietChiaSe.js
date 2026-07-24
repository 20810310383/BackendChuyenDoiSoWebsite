const mongoose = require('mongoose');

const baiVietChiaSeSchema = new mongoose.Schema(
  {
    tieuDe: {
      type: String,
      required: [true, 'Vui lòng nhập tiêu đề bài viết'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    tomTat: {
      type: String,
      trim: true,
      default: ''
    },
    noiDung: {
      type: String,
      default: ''
    },
    hinhAnhDaiDien: {
      type: String,
      default: ''
    },
    chuyenMuc: {
      type: String,
      default: 'Tin tức',
      trim: true
    },
    trangThai: {
      type: String,
      enum: ['hienthi', 'an'],
      default: 'hienthi'
    },
    luotXem: {
      type: Number,
      default: 0
    },
    tacGia: {
      type: String,
      default: 'Ban Quản trị'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('BaiVietChiaSe', baiVietChiaSeSchema);

const mongoose = require('mongoose');

const phanQuyenSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true,
      enum: ['admin', 'nhanvien', 'thongke']
    },
    caiDat: {
      dashboard: {
        xem: { type: Boolean, default: true }
      },
      truSo: {
        xem: { type: Boolean, default: true },
        them: { type: Boolean, default: true },
        sua: { type: Boolean, default: true },
        xoa: { type: Boolean, default: true }
      },
      thon: {
        xem: { type: Boolean, default: true },
        them: { type: Boolean, default: true },
        sua: { type: Boolean, default: true },
        xoa: { type: Boolean, default: true },
        quanLyCanBo: { type: Boolean, default: true }
      },
      nguoiDung: {
        xem: { type: Boolean, default: true },
        them: { type: Boolean, default: true },
        sua: { type: Boolean, default: true },
        xoa: { type: Boolean, default: true },
        duyetTaiKhoan: { type: Boolean, default: true }
      },
      banners: {
        xem: { type: Boolean, default: true },
        them: { type: Boolean, default: true },
        sua: { type: Boolean, default: true },
        xoa: { type: Boolean, default: true }
      },
      phanQuyen: {
        xem: { type: Boolean, default: true }
      },
      caiDatHeThong: {
        xem: { type: Boolean, default: true },
        sua: { type: Boolean, default: true }
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PhanQuyen', phanQuyenSchema);

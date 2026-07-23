const mongoose = require('mongoose');

const caiDatSchema = new mongoose.Schema(
  {
    tenCong: {
      type: String,
      default: 'CỔNG TRA CỨU THÔN MỚI'
    },
    tenDonVi: {
      type: String,
      default: 'Xã Thanh Liêm, tỉnh Ninh Bình'
    },
    logoUrl: {
      type: String,
      default: '/images/logo.png'
    },
    moTaFooter: {
      type: String,
      default: 'Cổng thông tin tra cứu thôn sau sáp nhập, phục vụ người dân và cán bộ địa phương tra cứu nhanh chóng, chính xác.'
    },
    hoTroLienHe: {
      type: String,
      default: 'Liên hệ UBND xã trong giờ hành chính'
    },
    sdtHotline: {
      type: String,
      default: ''
    },
    emailLienHe: {
      type: String,
      default: ''
    },
    diachi: {
      type: String,
      default: 'Xã Thanh Liêm, tỉnh Ninh Bình'
    },
    slogan: {
      type: String,
      default: 'TIÊN PHONG • ĐOÀN KẾT • BẢN LĨNH • ĐỘT PHÁ • PHÁT TRIỂN'
    },
    namCapNhat: {
      type: String,
      default: '2026'
    },
    facebookUrl: {
      type: String,
      default: ''
    },
    youtubeUrl: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CaiDat', caiDatSchema);

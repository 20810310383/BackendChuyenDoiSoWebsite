const mongoose = require('mongoose');

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
      default: 'Thông tin giới thiệu về cơ cấu tổ chức, Ban Chấp hành, Ban Thường vụ Đoàn TNCS Hồ Chí Minh xã, nhiệm vụ và định hướng hoạt động phong trào thanh thiếu nhi.'
    },
    hinhAnhDaiDien: {
      type: String,
      default: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop'
    },
    noiDung: {
      type: String,
      default: `<h2>Giới thiệu Ban Chấp hành, Ban Thường vụ Đoàn xã</h2><p>Đoàn TNCS Hồ Chí Minh xã là tổ chức chính trị - xã hội của thanh niên, cánh tay đắc lực của Đảng bộ xã, luôn xung kích đi đầu trong mọi hoạt động phong trào, phát triển kinh tế - xã hội và chuyển đổi số tại địa phương.</p><h2>Cơ cấu tổ chức Ban Chấp hành</h2><p>Ban Chấp hành Đoàn xã gồm các đồng chí Bí thư, Phó Bí thư và các Ủy viên BTV, Ủy viên BCH đại diện cho các chi đoàn thôn/xóm và các chi đoàn trực thuộc.</p><h2>Nhiệm vụ trọng tâm</h2><p>Tuyên truyền giáo dục lý tưởng cách mạng, đồng hành với thanh niên trong học tập, khởi nghiệp, lập nghiệp và phát động các phong trào tình nguyện chuyển đổi số cộng đồng.</p>`
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

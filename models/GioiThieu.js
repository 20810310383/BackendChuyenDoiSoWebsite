const mongoose = require('mongoose');

const gioiThieuSchema = new mongoose.Schema(
  {
    tieuDe: {
      type: String,
      required: true,
      default: 'Giới thiệu tổng quan Xã Thanh Liêm, tỉnh Ninh Bình'
    },
    slug: {
      type: String,
      default: 'gioi-thieu'
    },
    tomTat: {
      type: String,
      default: 'Cổng thông tin giới thiệu tổng quan về vị trí địa lý, lịch sử hình thành, văn hóa truyền thống và quá trình phát triển chuyển đổi số xã Thanh Liêm.'
    },
    hinhAnhDaiDien: {
      type: String,
      default: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop'
    },
    noiDung: {
      type: String,
      default: `<h2>Giới thiệu chung về địa phương</h2><p>Xã Thanh Liêm là một vùng đất giàu truyền thống văn hóa và lịch sử thuộc tỉnh Ninh Bình. Trải qua các thời kỳ sáp nhập và phát triển, địa phương luôn là điểm sáng trong công tác xây dựng nông thôn mới và chuyển đổi số cấp xã.</p><h2>Vị trí địa lý & Dân số</h2><p>Địa bàn xã bao gồm nhiều thôn/xóm với hạ tầng giao thông thuận lợi, nhà văn hóa thôn đạt chuẩn và hệ thống truyền thanh thông minh phục vụ đời sống nhân dân.</p><h2>Định hướng Chuyển đổi số</h2><p>Nhằm phục vụ người dân tra cứu thông tin thôn xóm, trụ sở hành chính và cán bộ địa phương nhanh chóng, chính xác, Cổng thông tin điện tử tra cứu thôn mới đã được đưa vào vận hành đồng bộ.</p>`
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

module.exports = mongoose.model('GioiThieu', gioiThieuSchema);

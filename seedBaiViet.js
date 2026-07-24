const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const BaiVietChiaSe = require('./models/BaiVietChiaSe');
const ChuyenMucBaiViet = require('./models/ChuyenMucBaiViet');

dotenv.config({ path: path.join(__dirname, '.env') });

const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const sampleArticles = [
  {
    tieuDe: 'Tuổi trẻ xã Tân Thanh ra quân Ngày Chủ nhật xanh và chuyển đổi số cộng đồng',
    tomTat: 'Hơn 150 đoàn viên thanh niên đã đồng loạt ra quân dọn dẹp vệ sinh môi trường, tạo cảnh quan xanh - sạch - đẹp và hướng dẫn bà con nhân dân sử dụng dịch vụ công trực tuyến.',
    noiDung: `<p>Nhằm phát huy vai trò xung kích của tuổi trẻ trong công tác bảo vệ môi trường và chuyển đổi số, sáng nay Ban Chấp hành Đoàn xã Tân Thanh đã tổ chức lễ ra quân <strong>"Ngày Chủ nhật xanh"</strong> kết hợp với đợt tuyên truyền chuyển đổi số cộng đồng trên địa bàn toàn xã.</p>
    <h3>1. Hoạt động vệ sinh môi trường & tôn tạo cảnh quan</h3>
    <p>Các lực lượng đoàn viên thanh niên đã tập trung dọn dẹp vệ sinh tại các tuyến đường chính, các khu vực trụ sở hành chính, nhà văn hóa các thôn, thu gom hơn 2 tấn rác thải nhựa và trồng mới 100 cây xanh ven đường.</p>
    <p><img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80" alt="Ngày chủ nhật xanh" /></p>
    <h3>2. Hướng dẫn Dịch vụ công trực tuyến cho nhân dân</h3>
    <p>Đội hình Thanh niên tình nguyện chuyển đổi số đã đến tận các hộ gia đình và nhà văn hóa thôn để hướng dẫn bà con nộp hồ sơ thủ tục hành chính trực tuyến qua <em>Cổng Dịch vụ công Quốc gia</em>, giúp tiết kiệm thời gian và chi phí đi lại.</p>`,
    hinhAnhDaiDien: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    chuyenMuc: 'Hoạt động Đoàn',
    trangThai: 'hienthi',
    luotXem: 142,
    tacGia: 'BTV Đoàn xã'
  },
  {
    tieuDe: 'Kế hoạch triển khai đợt cao điểm hướng dẫn kích hoạt tài khoản định danh điện tử VNeID',
    tomTat: 'Ban Chấp hành Đoàn xã phối hợp cùng Công an xã tổ chức các tổ lưu động hỗ trợ bà con nhân dân đăng ký, kích hoạt tài khoản định danh điện tử mức độ 2.',
    noiDung: `<p>Thực hiện Đề án 06 của Chính phủ về phát triển ứng dụng dữ liệu về dân cư, định danh và xác thực điện tử, Đoàn xã Tân Thanh phối hợp với Công an xã ban hành kế hoạch ra quân tổ chức đợt cao điểm hỗ trợ nhân dân kích hoạt <strong>VNeID mức độ 2</strong>.</p>
    <ul>
      <li><strong>Thời gian:</strong> Từ ngày 01 đến ngày 15 hàng tháng.</li>
      <li><strong>Địa điểm:</strong> Trụ sở UBND xã và Nhà văn hóa 10 thôn trên địa bàn.</li>
      <li><strong>Đối tượng:</strong> Toàn thể công dân từ đủ 14 tuổi trở lên chưa kích hoạt VNeID.</li>
    </ul>
    <p><img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80" alt="Tài khoản VNeID" /></p>
    <p>Đoàn xã kêu gọi đoàn viên thanh niên đi đầu làm gương và tích cực trợ giúp người thân, gia đình hoàn thành việc định danh điện tử trước thời hạn quy định.</p>`,
    hinhAnhDaiDien: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
    chuyenMuc: 'Thông báo',
    trangThai: 'hienthi',
    luotXem: 289,
    tacGia: 'Công an & Đoàn xã'
  },
  {
    tieuDe: 'Tập huấn nâng cao năng lực số cho đoàn viên thanh niên năm 2026',
    tomTat: 'Nhằm trang bị kỹ năng công nghệ thông tin, an toàn thông tin trên không gian mạng và ứng dụng trí tuệ nhân tạo vào công việc, học tập cho thế hệ trẻ.',
    noiDung: `<p>Vừa qua, Ban Thường vụ Đoàn xã đã tổ chức lớp tập huấn kỹ năng số với chủ đề <em>"Thanh niên Tân Thanh làm chủ công nghệ trong kỷ nguyên mới"</em> cho hơn 80 cán bộ chi đoàn và đoàn viên ưu tú.</p>
    <p><img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80" alt="Tập huấn kỹ năng số" /></p>
    <h3>Nội dung trọng tâm:</h3>
    <ol>
      <li>Kỹ năng bảo mật tài khoản cá nhân, phòng tránh lừa đảo qua tin nhắn và cuộc gọi rác.</li>
      <li>Ứng dụng các công cụ trí tuệ nhân tạo (AI) hỗ trợ thiết kế truyền thông và quản lý văn bản.</li>
      <li>Xây dựng kênh truyền thông tuyên truyền phong trào Đoàn hiệu quả trên nền tảng mạng xã hội.</li>
    </ol>`,
    hinhAnhDaiDien: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    chuyenMuc: 'Chuyển đổi số',
    trangThai: 'hienthi',
    luotXem: 175,
    tacGia: 'Tổ Công nghệ số'
  },
  {
    tieuDe: 'Gương thanh niên làm kinh tế giỏi: Mô hình nông nghiệp công nghệ cao của Đ/c Nguyễn Văn An',
    tomTat: 'Khởi nghiệp từ mô hình trồng dưa lưới sinh học áp dụng hệ thống tưới nhỏ giọt tự động, mang lại thu nhập hàng trăm triệu đồng mỗi năm.',
    noiDung: `<p>Đồng chí <strong>Nguyễn Văn An</strong> (sinh năm 1996, đoàn viên chi đoàn thôn Tân Lập) là một trong những tấm gương sáng tiêu biểu trong phong trào thanh niên lập nghiệp tại địa phương.</p>
    <p><img src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80" alt="Mô hình nông nghiệp công nghệ cao" /></p>
    <p>Với diện tích nhà màng hơn 2.500 m², anh An đã đầu tư hệ thống cảm biến nhiệt độ và tưới nhỏ giọt Israel tự động. Mỗi năm mô hình thu hoạch 3 vụ dưa lưới, sản lượng đạt trên 12 tấn, doanh thu sau khi trừ chi phí đạt hơn 350 triệu đồng.</p>
    <p>Mô hình của anh không những làm giàu cho gia đình mà còn tạo việc làm thường xuyên cho 5 lao động thanh niên tại thôn.</p>`,
    hinhAnhDaiDien: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80',
    chuyenMuc: 'Gương điển hình',
    trangThai: 'hienthi',
    luotXem: 310,
    tacGia: 'Ban Tuyên giáo Đoàn'
  },
  {
    tieuDe: 'Hội nghị Tổng kết công tác Đoàn và phong trào thanh thiếu nhi năm 2025',
    tomTat: 'Đánh giá những kết quả nổi bật trong năm qua, khen thưởng 15 tập thể và cá nhân có thành tích xuất sắc trong phong trào thanh niên xung kích.',
    noiDung: `<p>Ban Chấp hành Đoàn xã Tân Thanh vừa qua đã tổ chức thành công Hội nghị tổng kết công tác Đoàn - Hội và phong trào thanh thiếu nhi năm 2025, đề ra phương hướng nhiệm vụ trọng tâm năm 2026.</p>
    <p><img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80" alt="Hội nghị tổng kết" /></p>
    <p>Trong năm 2025, Đoàn xã đã hoàn thành 100% các chỉ tiêu đề ra, nổi bật là công trình thanh niên đường cờ tổ quốc, chuỗi hoạt động đền ơn đáp nghĩa và hỗ trợ chuyển đổi số cho người dân.</p>`,
    hinhAnhDaiDien: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    chuyenMuc: 'Tin tức',
    trangThai: 'hienthi',
    luotXem: 198,
    tacGia: 'Văn phòng Đoàn xã'
  },
  {
    tieuDe: 'Tuyên truyền phòng chống lừa đảo trực tuyến trên không gian mạng',
    tomTat: 'Khuyến cáo nhân dân nâng cao cảnh giác trước các thủ đoạn mạo danh cơ quan công an, ngân hàng để chiếm đoạt tài sản qua điện thoại và mạng xã hội.',
    noiDung: `<p>Hiện nay, các thủ đoạn lừa đảo công nghệ cao trên không gian mạng ngày càng diễn biến phức tạp với nhiều chiêu thức tinh vi. Đoàn xã Tân Thanh khuyến cáo bà con nhân dân nêu cao tinh thần cảnh giác với các phương thức sau:</p>
    <ul>
      <li>Không cung cấp mã OTP, mật khẩu tài khoản ngân hàng cho bất kỳ ai.</li>
      <li>Không bấm vào các đường link lạ nhận được qua SMS, Zalo, Facebook.</li>
      <li>Cảnh giác với cuộc gọi xưng danh Công an, Tòa án, Viện kiểm sát yêu cầu chuyển tiền.</li>
    </ul>
    <p><img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80" alt="An toàn thông tin" /></p>`,
    hinhAnhDaiDien: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
    chuyenMuc: 'Chuyển đổi số',
    trangThai: 'hienthi',
    luotXem: 245,
    tacGia: 'Đội hình An ninh mạng'
  },
  {
    tieuDe: 'Thông báo về việc tổ chức Giải bóng đá Thanh niên xã Tân Thanh chào mừng Đại hội Đoàn',
    tomTat: 'Giải đấu quy tụ 10 đội bóng đại diện cho các chi đoàn thôn, dự kiến diễn ra từ ngày 15/08 đến 25/08 tại sân vận động xã.',
    noiDung: `<p>Chào mừng Đại hội Đại biểu Đoàn TNCS Hồ Chí Minh xã Tân Thanh, Ban Chấp hành Đoàn xã trân trọng thông báo kế hoạch tổ chức <strong>Giải bóng đá Thanh niên năm 2026</strong>.</p>
    <p><img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80" alt="Giải bóng đá thanh niên" /></p>
    <p>Giải đấu là sân chơi thể thao lành mạnh, bổ ích, góp phần thắt chặt tình đoàn kết giữa các chi đoàn thôn. Ban Tổ chức trân trọng kính mời đông đảo đoàn viên và bà con nhân dân đến xem và cổ vũ cho các đội bóng.</p>`,
    hinhAnhDaiDien: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80',
    chuyenMuc: 'Thông báo',
    trangThai: 'hienthi',
    luotXem: 412,
    tacGia: 'BTC Giải Thể thao'
  },
  {
    tieuDe: 'Đoàn xã Tân Thanh khánh thành công trình thanh niên "Thắp sáng đường quê bằng năng lượng mặt trời"',
    tomTat: 'Tuyến đường dài 2.5 km được lắp đặt 50 bộ đèn năng lượng mặt trời tự động, góp phần đảm bảo an ninh trật tự và an toàn giao thông cho nhân dân.',
    noiDung: `<p>Chiều qua, Đoàn xã Tân Thanh đã phối hợp cùng chính quyền địa phương tổ chức lễ khánh thành công trình thanh niên <em>"Thắp sáng đường quê"</em> tại tuyến đường thôn Tân Minh.</p>
    <p><img src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80" alt="Đèn năng lượng mặt trời" /></p>
    <p>Công trình có tổng giá trị hơn 60 triệu đồng từ nguồn vốn xã hội hóa và ngày công đóng góp của đoàn viên thanh niên. Việc đưa vào sử dụng tuyến đường điện sáng giúp bà con đi lại an toàn vào ban đêm.</p>`,
    hinhAnhDaiDien: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
    chuyenMuc: 'Hoạt động Đoàn',
    trangThai: 'hienthi',
    luotXem: 267,
    tacGia: 'BTV Đoàn xã'
  },
  {
    tieuDe: 'Tuổi trẻ Tân Thanh tích cực hưởng ứng Chiến dịch Thanh niên tình nguyện Hè',
    tomTat: 'Phát động các hoạt động tiếp sức mùa thi, đền ơn đáp nghĩa, chăm sóc gia đình chính sách, người có công nhân kỷ niệm ngày Thương binh Liệt sĩ.',
    noiDung: `<p>Nằm trong chuỗi các hoạt động của Chiến dịch Thanh niên tình nguyện Hè, Đoàn xã Tân Thanh đã ra quân thực hiện nhiều phần việc ý nghĩa hướng về cộng đồng.</p>
    <p><img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1000&q=80" alt="Chiến dịch tình nguyện hè" /></p>
    <p>Đoàn xã đã thăm hỏi và trao tặng 10 suất quà cho các mẹ Việt Nam anh hùng, thương bệnh binh trên địa bàn; đồng thời tổ chức thắp nến tri ân tại nghĩa trang liệt sĩ xã.</p>`,
    hinhAnhDaiDien: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1000&q=80',
    chuyenMuc: 'Tin tức',
    trangThai: 'hienthi',
    luotXem: 220,
    tacGia: 'BTV Đoàn xã'
  },
  {
    tieuDe: 'Hướng dẫn thanh toán không dùng tiền mặt tại các chợ truyền thống và hộ kinh doanh',
    tomTat: 'Đội hình thanh niên tình nguyện số trao tặng mã QR Code thanh toán miễn phí cho hơn 120 tiểu thương trên địa bàn xã.',
    noiDung: `<p>Nhằm đẩy mạnh phong trào chuyển đổi số trong đời sống sinh hoạt của nhân dân, Đoàn xã Tân Thanh phối hợp với các ngân hàng thương mại triển khai chương trình <strong>"Mô hình Chợ 4.0 - Thanh toán không dùng tiền mặt"</strong>.</p>
    <p><img src="https://images.unsplash.com/photo-1556742049-0a674735c938?auto=format&fit=crop&w=1000&q=80" alt="Thanh toán QR Code" /></p>
    <p>Các đoàn viên đã hỗ trợ tạo tài khoản và in bảng mã QR Code miễn phí cho các tiệm tạp hóa, gian hàng chợ truyền thống, giúp người dân dễ dàng quét mã mua sắm thuận tiện.</p>`,
    hinhAnhDaiDien: 'https://images.unsplash.com/photo-1556742049-0a674735c938?auto=format&fit=crop&w=1000&q=80',
    chuyenMuc: 'Chuyển đổi số',
    trangThai: 'hienthi',
    luotXem: 355,
    tacGia: 'Tổ Công nghệ số'
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chuyendoiso';
    await mongoose.connect(mongoUri);
    console.log('Đã kết nối MongoDB thành công!');

    // Xóa bài viết cũ nếu muốn làm mới hoàn toàn
    await BaiVietChiaSe.deleteMany({});
    console.log('Đã làm sạch dữ liệu bài viết cũ.');

    for (const item of sampleArticles) {
      const slug = slugify(item.tieuDe);
      await BaiVietChiaSe.create({
        ...item,
        slug
      });
    }

    console.log('✅ Đã thêm mới thành công 10 bài viết mẫu chất lượng cao!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi khởi tạo bài viết:', error);
    process.exit(1);
  }
};

seedDB();

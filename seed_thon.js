const mongoose = require('mongoose');
require('dotenv').config();

const thonSchema = new mongoose.Schema(
  {
    tenThon: String,
    hinhAnh: String,
    thonCu: String,
    thonGoc: [String],
    nhaVanHoa: String,
    diaChiNhaVanHoa: String,
    soHoDan: Number,
    danSo: Number,
    tyLeHoToanXa: String,
    khoangCachTrungTam: String,
    gioiThieu: String,
    linkGoogleMaps: String,
    linkChiDuong: String,
    toaDo: { lat: Number, lng: Number },
    danhSachCanBo: [
      {
        hoTen: String,
        chucVu: String,
        soDienThoai: String,
        avatar: String,
        email: String,
        ghiChu: String
      }
    ],
    trangThai: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Thon = mongoose.model('Thon', thonSchema);

const sampleData = [
  {
    tenThon: 'Thôn Tâng',
    thonCu: '1 Tâng, 2 Tâng',
    thonGoc: ['1 Tâng', '2 Tâng'],
    nhaVanHoa: 'Nhà văn hoá thôn 02 Tâng (cũ)',
    diaChiNhaVanHoa: 'Nhà văn hóa thôn 02 Tâng',
    soHoDan: 573,
    danSo: 2060,
    tyLeHoToanXa: '8.9%',
    khoangCachTrungTam: '5.1 km',
    gioiThieu: 'Thôn Tâng thành lập sau sáp nhập từ 1 Tâng và 2 Tâng, kinh tế phát triển nông nghiệp kết hợp tiểu thủ công nghiệp.',
    linkGoogleMaps: 'https://maps.google.com/?q=Nhà+văn+hoá+thôn+02+Tâng',
    linkChiDuong: 'https://www.google.com/maps/dir//Nhà+văn+hoá+thôn+02+Tâng',
    danhSachCanBo: [
      { hoTen: 'Lương Văn Thọ', chucVu: 'Bí thư chi bộ', soDienThoai: '0379507305', email: 'tho.luong@gmail.com' },
      { hoTen: 'Nguyễn Văn Lai', chucVu: 'Trưởng thôn', soDienThoai: '0933454966', email: 'lai.nguyen@gmail.com' },
      { hoTen: 'Vũ Văn Dũng', chucVu: 'Trưởng Ban CTMT', soDienThoai: '0917624633' },
      { hoTen: 'Trần Văn Hoàng', chucVu: 'Phó Trưởng thôn', soDienThoai: '0988123456' },
      { hoTen: 'Phạm Thị Mai', chucVu: 'Chi hội trưởng Hội Phụ nữ', soDienThoai: '0912345678' },
      { hoTen: 'Đỗ Văn Cường', chucVu: 'Bí thư Chi đoàn thanh niên', soDienThoai: '0977888999' },
      { hoTen: 'Lê Văn Tùng', chucVu: 'Chi hội trưởng Hội Nông dân', soDienThoai: '0966555444' },
      { hoTen: 'Nguyễn Thị Hoa', chucVu: 'Chi hội trưởng Hội Cựu chiến binh', soDienThoai: '0944333222' },
      { hoTen: 'Bùi Văn Nam', chucVu: 'Công an viên phụ trách thôn', soDienThoai: '0933222111' },
      { hoTen: 'Ngô Thị Yến', chucVu: 'Chi hội trưởng Hội Chữ thập đỏ', soDienThoai: '0922111000' }
    ]
  },
  {
    tenThon: 'Thôn Thanh Hương',
    thonCu: '3 Tâng, 4 Tâng',
    thonGoc: ['3 Tâng', '4 Tâng'],
    nhaVanHoa: 'Nhà Văn Hóa thôn 4 Tâng',
    diaChiNhaVanHoa: 'Nhà Văn Hóa thôn 4 Tâng',
    soHoDan: 574,
    danSo: 2070,
    tyLeHoToanXa: '8.9%',
    khoangCachTrungTam: '4.8 km',
    gioiThieu: 'Thôn Thanh Hương có truyền thống văn hóa lâu đời, đời sống nhân dân ổn định.',
    linkGoogleMaps: 'https://maps.google.com/?q=Nhà+Văn+Hóa+thôn+4+Tâng',
    linkChiDuong: 'https://www.google.com/maps/dir//Nhà+Văn+Hóa+thôn+4+Tâng',
    danhSachCanBo: [
      { hoTen: 'Nguyễn Văn Minh', chucVu: 'Bí thư chi bộ', soDienThoai: '0981111222' },
      { hoTen: 'Hoàng Văn Đức', chucVu: 'Trưởng thôn', soDienThoai: '0972333444' },
      { hoTen: 'Nguyễn Thị Lan', chucVu: 'Phó Trưởng thôn', soDienThoai: '0983444555' },
      { hoTen: 'Phạm Văn Hùng', chucVu: 'Trưởng Ban CTMT', soDienThoai: '0914555666' },
      { hoTen: 'Trần Thị Thu', chucVu: 'Chi hội trưởng Hội Phụ nữ', soDienThoai: '0925666777' },
      { hoTen: 'Lê Minh Tuấn', chucVu: 'Bí thư Chi đoàn thanh niên', soDienThoai: '0936777888' },
      { hoTen: 'Đỗ Văn Thành', chucVu: 'Chi hội trưởng Hội Nông dân', soDienThoai: '0947888999' },
      { hoTen: 'Vũ Văn Bình', chucVu: 'Chi hội trưởng Hội Cựu chiến binh', soDienThoai: '0958999000' },
      { hoTen: 'Ngô Văn Hải', chucVu: 'Công an viên phụ trách thôn', soDienThoai: '0969000111' },
      { hoTen: 'Đặng Thị Hương', chucVu: 'Chi hội trưởng Hội Chữ thập đỏ', soDienThoai: '0970111222' }
    ]
  },
  {
    tenThon: 'Thôn Nội Chiều',
    thonCu: 'Lạc Nội, Lạc Chiều',
    thonGoc: ['Lạc Nội', 'Lạc Chiều'],
    nhaVanHoa: 'Nhà văn hóa thôn Lạc Nội',
    diaChiNhaVanHoa: 'Nhà văn hóa thôn Lạc Nội',
    soHoDan: 719,
    danSo: 2590,
    tyLeHoToanXa: '11.2%',
    khoangCachTrungTam: '6.2 km',
    gioiThieu: 'Thôn Nội Chiều là thôn lớn với 719 hộ dân, tình hình an ninh trật tự luôn đảm bảo.',
    linkGoogleMaps: 'https://maps.google.com/?q=Nhà+văn+hóa+thôn+Lạc+Nội',
    linkChiDuong: 'https://www.google.com/maps/dir//Nhà+văn+hóa+thôn+Lạc+Nội',
    danhSachCanBo: [
      { hoTen: 'Đặng Văn Tiến', chucVu: 'Bí thư chi bộ', soDienThoai: '0915666777' },
      { hoTen: 'Phạm Văn Thành', chucVu: 'Trưởng thôn', soDienThoai: '0904888999' },
      { hoTen: 'Nguyễn Văn Định', chucVu: 'Phó Trưởng thôn', soDienThoai: '0916999000' },
      { hoTen: 'Trần Văn Cường', chucVu: 'Trưởng Ban CTMT', soDienThoai: '0927000111' },
      { hoTen: 'Bùi Thị Hà', chucVu: 'Chi hội trưởng Hội Phụ nữ', soDienThoai: '0938111222' },
      { hoTen: 'Vũ Quốc Anh', chucVu: 'Bí thư Chi đoàn thanh niên', soDienThoai: '0949222333' },
      { hoTen: 'Nguyễn Văn Thắng', chucVu: 'Chi hội trưởng Hội Nông dân', soDienThoai: '0950333444' },
      { hoTen: 'Lê Văn Sơn', chucVu: 'Chi hội trưởng Hội Cựu chiến binh', soDienThoai: '0961444555' },
      { hoTen: 'Đỗ Văn Lực', chucVu: 'Công an viên phụ trách thôn', soDienThoai: '0972555666' },
      { hoTen: 'Phạm Thị Thúy', chucVu: 'Chi hội trưởng Hội Chữ thập đỏ', soDienThoai: '0983666777' }
    ]
  },
  {
    tenThon: 'Thôn Đồng Sơn',
    thonCu: 'Đồng 1, Đồng 2',
    thonGoc: ['Đồng 1', 'Đồng 2'],
    nhaVanHoa: 'Nhà văn hóa thôn Đồng Sơn',
    diaChiNhaVanHoa: '',
    soHoDan: 480,
    danSo: 1820,
    tyLeHoToanXa: '7.5%',
    khoangCachTrungTam: '3.5 km',
    gioiThieu: 'Thôn Đồng Sơn nằm gần trung tâm xã, có phong trào xây dựng nông thôn mới phát triển mạnh mẽ.',
    danhSachCanBo: [
      { hoTen: 'Nguyễn Hữu Nghĩa', chucVu: 'Bí thư chi bộ', soDienThoai: '0911222333' },
      { hoTen: 'Trần Đình Trọng', chucVu: 'Trưởng thôn', soDienThoai: '0922333444' },
      { hoTen: 'Vũ Thị Nguyệt', chucVu: 'Phó Trưởng thôn', soDienThoai: '0933444555' },
      { hoTen: 'Lê Văn Khải', chucVu: 'Trưởng Ban CTMT', soDienThoai: '0944555666' },
      { hoTen: 'Đỗ Thị Quyên', chucVu: 'Chi hội trưởng Hội Phụ nữ', soDienThoai: '0955666777' },
      { hoTen: 'Phạm Văn Nam', chucVu: 'Bí thư Chi đoàn thanh niên', soDienThoai: '0966777888' },
      { hoTen: 'Nguyễn Văn Phúc', chucVu: 'Chi hội trưởng Hội Nông dân', soDienThoai: '0977888999' },
      { hoTen: 'Hoàng Văn Lập', chucVu: 'Chi hội trưởng Hội Cựu chiến binh', soDienThoai: '0988999000' },
      { hoTen: 'Bùi Văn Hùng', chucVu: 'Công an viên phụ trách thôn', soDienThoai: '0999000111' },
      { hoTen: 'Trịnh Thị Nga', chucVu: 'Chi hội trưởng Hội Chữ thập đỏ', soDienThoai: '0900111222' }
    ]
  },
  {
    tenThon: 'Thôn Tân Lập',
    thonCu: 'Tân 1, Tân 2',
    thonGoc: ['Tân 1', 'Tân 2'],
    nhaVanHoa: 'Nhà văn hóa thôn Tân Lập',
    diaChiNhaVanHoa: '',
    soHoDan: 620,
    danSo: 2310,
    tyLeHoToanXa: '9.8%',
    khoangCachTrungTam: '2.8 km',
    gioiThieu: 'Thôn Tân Lập là trung tâm thương mại dịch vụ sầm uất của xã.',
    danhSachCanBo: [
      { hoTen: 'Vũ Văn Sang', chucVu: 'Bí thư chi bộ', soDienThoai: '0912111222' },
      { hoTen: 'Nguyễn Văn Lợi', chucVu: 'Trưởng thôn', soDienThoai: '0923222333' },
      { hoTen: 'Phạm Văn Khang', chucVu: 'Phó Trưởng thôn', soDienThoai: '0934333444' },
      { hoTen: 'Lê Thị Tuyết', chucVu: 'Trưởng Ban CTMT', soDienThoai: '0945444555' },
      { hoTen: 'Trần Thị Hằng', chucVu: 'Chi hội trưởng Hội Phụ nữ', soDienThoai: '0956555666' },
      { hoTen: 'Đỗ Tiến Đạt', chucVu: 'Bí thư Chi đoàn thanh niên', soDienThoai: '0967666777' },
      { hoTen: 'Nguyễn Văn Dũng', chucVu: 'Chi hội trưởng Hội Nông dân', soDienThoai: '0978777888' },
      { hoTen: 'Bùi Văn Kiểm', chucVu: 'Chi hội trưởng Hội Cựu chiến binh', soDienThoai: '0989888999' },
      { hoTen: 'Hoàng Văn Huy', chucVu: 'Công an viên phụ trách thôn', soDienThoai: '0990999000' },
      { hoTen: 'Phùng Thị Liên', chucVu: 'Chi hội trưởng Hội Chữ thập đỏ', soDienThoai: '0901000111' }
    ]
  },
  {
    tenThon: 'Thôn Phú Mẫn',
    thonCu: 'Phú 1, Phú 2',
    thonGoc: ['Phú 1', 'Phú 2'],
    nhaVanHoa: 'Nhà văn hóa thôn Phú Mẫn',
    diaChiNhaVanHoa: '',
    soHoDan: 510,
    danSo: 1950,
    tyLeHoToanXa: '8.2%',
    khoangCachTrungTam: '4.2 km',
    gioiThieu: 'Thôn Phú Mẫn năng động trong các phong trào văn hóa thể thao cấp xã.',
    danhSachCanBo: [
      { hoTen: 'Lê Văn Hiếu', chucVu: 'Bí thư chi bộ', soDienThoai: '0913111333' },
      { hoTen: 'Đỗ Văn Thành', chucVu: 'Trưởng thôn', soDienThoai: '0924222444' },
      { hoTen: 'Nguyễn Thị Hồng', chucVu: 'Phó Trưởng thôn', soDienThoai: '0935333555' },
      { hoTen: 'Trần Văn Tám', chucVu: 'Trưởng Ban CTMT', soDienThoai: '0946444666' },
      { hoTen: 'Vũ Thị Dung', chucVu: 'Chi hội trưởng Hội Phụ nữ', soDienThoai: '0957555777' },
      { hoTen: 'Hoàng Minh Vương', chucVu: 'Bí thư Chi đoàn thanh niên', soDienThoai: '0968666888' },
      { hoTen: 'Phạm Văn Chinh', chucVu: 'Chi hội trưởng Hội Nông dân', soDienThoai: '0979777999' },
      { hoTen: 'Bùi Văn Sửu', chucVu: 'Chi hội trưởng Hội Cựu chiến binh', soDienThoai: '0990888000' },
      { hoTen: 'Nguyễn Văn Đô', chucVu: 'Công an viên phụ trách thôn', soDienThoai: '0901999111' },
      { hoTen: 'Trịnh Thị Cúc', chucVu: 'Chi hội trưởng Hội Chữ thập đỏ', soDienThoai: '0912000222' }
    ]
  },
  {
    tenThon: 'Thôn An Hòa',
    thonCu: 'An 1, An 2',
    thonGoc: ['An 1', 'An 2'],
    nhaVanHoa: 'Nhà văn hóa thôn An Hòa',
    diaChiNhaVanHoa: '',
    soHoDan: 450,
    danSo: 1750,
    tyLeHoToanXa: '7.1%',
    khoangCachTrungTam: '5.5 km',
    gioiThieu: 'Thôn An Hòa có môi trường sống xanh sạch đẹp, yên bình.',
    danhSachCanBo: [
      { hoTen: 'Bùi Văn Thái', chucVu: 'Bí thư chi bộ', soDienThoai: '0914111444' },
      { hoTen: 'Nguyễn Văn Ninh', chucVu: 'Trưởng thôn', soDienThoai: '0925222555' },
      { hoTen: 'Hoàng Văn Thường', chucVu: 'Phó Trưởng thôn', soDienThoai: '0936333666' },
      { hoTen: 'Phạm Thị Thúy', chucVu: 'Trưởng Ban CTMT', soDienThoai: '0947444777' },
      { hoTen: 'Lê Thị Oanh', chucVu: 'Chi hội trưởng Hội Phụ nữ', soDienThoai: '0958555888' },
      { hoTen: 'Vũ Văn Hảo', chucVu: 'Bí thư Chi đoàn thanh niên', soDienThoai: '0969666999' },
      { hoTen: 'Đỗ Văn Tuyến', chucVu: 'Chi hội trưởng Hội Nông dân', soDienThoai: '0970777000' },
      { hoTen: 'Trần Văn Hòa', chucVu: 'Chi hội trưởng Hội Cựu chiến binh', soDienThoai: '0981888111' },
      { hoTen: 'Nguyễn Văn Sang', chucVu: 'Công an viên phụ trách thôn', soDienThoai: '0992999222' },
      { hoTen: 'Đặng Thị Tâm', chucVu: 'Chi hội trưởng Hội Chữ thập đỏ', soDienThoai: '0903000333' }
    ]
  },
  {
    tenThon: 'Thôn Minh Đức',
    thonCu: 'Minh 1, Minh 2',
    thonGoc: ['Minh 1', 'Minh 2'],
    nhaVanHoa: 'Nhà văn hóa thôn Minh Đức',
    diaChiNhaVanHoa: '',
    soHoDan: 590,
    danSo: 2180,
    tyLeHoToanXa: '9.2%',
    khoangCachTrungTam: '3.8 km',
    gioiThieu: 'Thôn Minh Đức nổi tiếng với tinh thần học tập và khuyến học.',
    danhSachCanBo: [
      { hoTen: 'Trần Văn Quảng', chucVu: 'Bí thư chi bộ', soDienThoai: '0915111555' },
      { hoTen: 'Vũ Văn Thiện', chucVu: 'Trưởng thôn', soDienThoai: '0926222666' },
      { hoTen: 'Nguyễn Văn Đạt', chucVu: 'Phó Trưởng thôn', soDienThoai: '0937333777' },
      { hoTen: 'Đỗ Thị Minh', chucVu: 'Trưởng Ban CTMT', soDienThoai: '0948444888' },
      { hoTen: 'Phạm Thị Mơ', chucVu: 'Chi hội trưởng Hội Phụ nữ', soDienThoai: '0959555999' },
      { hoTen: 'Lê Văn Giang', chucVu: 'Bí thư Chi đoàn thanh niên', soDienThoai: '0960666000' },
      { hoTen: 'Hoàng Văn Lâm', chucVu: 'Chi hội trưởng Hội Nông dân', soDienThoai: '0971777111' },
      { hoTen: 'Bùi Văn Hợi', chucVu: 'Chi hội trưởng Hội Cựu chiến binh', soDienThoai: '0982888222' },
      { hoTen: 'Nguyễn Văn Lượng', chucVu: 'Công an viên phụ trách thôn', soDienThoai: '0993999333' },
      { hoTen: 'Phùng Thị Hoa', chucVu: 'Chi hội trưởng Hội Chữ thập đỏ', soDienThoai: '0904000444' }
    ]
  },
  {
    tenThon: 'Thôn Quảng Xá',
    thonCu: 'Quảng 1, Quảng 2',
    thonGoc: ['Quảng 1', 'Quảng 2'],
    nhaVanHoa: 'Nhà văn hóa thôn Quảng Xá',
    diaChiNhaVanHoa: '',
    soHoDan: 640,
    danSo: 2420,
    tyLeHoToanXa: '10.1%',
    khoangCachTrungTam: '4.5 km',
    gioiThieu: 'Thôn Quảng Xá phát triển nhiều mô hình trang trại nông nghiệp công nghệ cao.',
    danhSachCanBo: [
      { hoTen: 'Phạm Văn Long', chucVu: 'Bí thư chi bộ', soDienThoai: '0916111666' },
      { hoTen: 'Nguyễn Văn Toàn', chucVu: 'Trưởng thôn', soDienThoai: '0927222777' },
      { hoTen: 'Trần Văn Quý', chucVu: 'Phó Trưởng thôn', soDienThoai: '0938333888' },
      { hoTen: 'Vũ Thị Huệ', chucVu: 'Trưởng Ban CTMT', soDienThoai: '0949444999' },
      { hoTen: 'Đỗ Thị Bích', chucVu: 'Chi hội trưởng Hội Phụ nữ', soDienThoai: '0950555000' },
      { hoTen: 'Bùi Hoàng Phong', chucVu: 'Bí thư Chi đoàn thanh niên', soDienThoai: '0961666111' },
      { hoTen: 'Lê Văn Khiêm', chucVu: 'Chi hội trưởng Hội Nông dân', soDienThoai: '0972777222' },
      { hoTen: 'Hoàng Văn Thêm', chucVu: 'Chi hội trưởng Hội Cựu chiến binh', soDienThoai: '0983888333' },
      { hoTen: 'Nguyễn Văn Thường', chucVu: 'Công an viên phụ trách thôn', soDienThoai: '0994999444' },
      { hoTen: 'Trịnh Thị Én', chucVu: 'Chi hội trưởng Hội Chữ thập đỏ', soDienThoai: '0905000555' }
    ]
  },
  {
    tenThon: 'Thôn Bình Lục',
    thonCu: 'Bình 1, Bình 2',
    thonGoc: ['Bình 1', 'Bình 2'],
    nhaVanHoa: 'Nhà văn hóa thôn Bình Lục',
    diaChiNhaVanHoa: '',
    soHoDan: 530,
    danSo: 2010,
    tyLeHoToanXa: '8.4%',
    khoangCachTrungTam: '5.8 km',
    gioiThieu: 'Thôn Bình Lục giữ vững danh hiệu Thôn Văn Hóa nhiều năm liền.',
    danhSachCanBo: [
      { hoTen: 'Hoàng Văn Tuyên', chucVu: 'Bí thư chi bộ', soDienThoai: '0917111777' },
      { hoTen: 'Nguyễn Văn Cường', chucVu: 'Trưởng thôn', soDienThoai: '0928222888' },
      { hoTen: 'Lê Văn Hiền', chucVu: 'Phó Trưởng thôn', soDienThoai: '0939333999' },
      { hoTen: 'Trần Thị Mây', chucVu: 'Trưởng Ban CTMT', soDienThoai: '0940444000' },
      { hoTen: 'Vũ Thị Gấm', chucVu: 'Chi hội trưởng Hội Phụ nữ', soDienThoai: '0951555111' },
      { hoTen: 'Đỗ Văn Khoa', chucVu: 'Bí thư Chi đoàn thanh niên', soDienThoai: '0962666222' },
      { hoTen: 'Phạm Văn Chức', chucVu: 'Chi hội trưởng Hội Nông dân', soDienThoai: '0973777333' },
      { hoTen: 'Bùi Văn Tuấn', chucVu: 'Chi hội trưởng Hội Cựu chiến binh', soDienThoai: '0984888444' },
      { hoTen: 'Nguyễn Văn Đạt', chucVu: 'Công an viên phụ trách thôn', soDienThoai: '0995999555' },
      { hoTen: 'Đặng Thị Thắm', chucVu: 'Chi hội trưởng Hội Chữ thập đỏ', soDienThoai: '0906000666' }
    ]
  }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/duanchuyendoiso';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB:', mongoUri);
    await Thon.deleteMany({});
    const res = await Thon.insertMany(sampleData);
    console.log(`Successfully seeded ${res.length} Thôn with 10 cán bộ each!`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();

const mongoose = require('mongoose');

// Hàm tạo slug SEO-friendly từ tiếng Việt
const generateSlug = (str) => {
  if (!str) return '';
  let slug = str.toLowerCase().trim();
  // Chuyển đổi ký tự tiếng Việt sang không dấu
  slug = slug
    .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
    .replace(/đ/gi, 'd')
    .replace(/[^a-z0-9\s-]/g, '')    // Bỏ ký tự đặc biệt
    .replace(/[\s_]+/g, '-')          // Thay khoảng trắng bằng dấu gạch
    .replace(/-+/g, '-')              // Bỏ dấu gạch thừa
    .replace(/^-+|-+$/g, '');         // Bỏ dấu gạch đầu/cuối
  return slug;
};

const TruSoHanhChinhSchema = new mongoose.Schema(
  {
    tenTruSo: {
      type: String,
      required: [true, 'Vui lòng nhập tên trụ sở / cơ quan'],
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      index: true
    },
    moTa: {
      type: String,
      trim: true,
      default: ''
    },
    moTaChiTiet: {
      type: String,
      default: '' // Nội dung chi tiết phong phú (HTML TinyMCE)
    },
    hinhAnh: {
      type: String,
      default: '' // Đường dẫn hình ảnh trụ sở
    },
    hinhAnhCo1: {
      type: String,
      default: '' // Đường dẫn hình ảnh Cờ 1 (vd: Cờ Đảng)
    },
    hinhAnhCo2: {
      type: String,
      default: '' // Đường dẫn hình ảnh Cờ 2 (vd: Cờ Tổ Quốc)
    },
    icon: {
      type: String,
      default: ''
    },
    linkGoogleMaps: {
      type: String,
      trim: true,
      default: ''
    },
    linkChiDuong: {
      type: String,
      trim: true,
      default: ''
    },
    diaChi: {
      type: String,
      trim: true,
      default: ''
    },
    soDienThoai: {
      type: String,
      trim: true,
      default: ''
    },
    toaDo: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 }
    },
    thuTu: {
      type: Number,
      default: 0
    },
    trangThai: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Pre-save middleware: Tự động tạo slug từ tenTruSo
TruSoHanhChinhSchema.pre('save', async function (next) {
  if (this.isModified('tenTruSo') || !this.slug) {
    let baseSlug = generateSlug(this.tenTruSo);
    let slug = baseSlug;
    let counter = 1;

    // Đảm bảo slug là duy nhất
    while (true) {
      const existing = await mongoose.model('TruSoHanhChinh').findOne({ slug, _id: { $ne: this._id } });
      if (!existing) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model('TruSoHanhChinh', TruSoHanhChinhSchema);

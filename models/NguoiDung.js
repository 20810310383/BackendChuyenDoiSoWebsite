const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const NguoiDungSchema = new mongoose.Schema(
  {
    hoTen: {
      type: String,
      required: [true, 'Vui lòng nhập họ và tên'],
      trim: true
    },
    username: {
      type: String,
      required: [true, 'Vui lòng nhập username'],
      unique: true,
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      required: [true, 'Vui lòng nhập email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Vui lòng nhập email hợp lệ'
      ]
    },
    sdt: {
      type: String,
      required: [true, 'Vui lòng nhập số điện thoại'],
      unique: true,
      trim: true
    },
    matKhau: {
      type: String,
      required: [true, 'Vui lòng nhập mật khẩu'],
      minlength: [6, 'Mật khẩu phải tối thiểu 6 ký tự'],
      select: false
    },
    role: {
      type: String,
      enum: ['admin', 'nhanvien', 'khachhang'],
      default: 'nhanvien'
    },
    diaChi: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: '/uploads/images/default-avatar.png'
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

// Hash password before save
NguoiDungSchema.pre('save', async function (next) {
  if (!this.isModified('matKhau')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.matKhau = await bcrypt.hash(this.matKhau, salt);
  next();
});

// So sánh mật khẩu
NguoiDungSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.matKhau);
};

module.exports = mongoose.model('NguoiDung', NguoiDungSchema);

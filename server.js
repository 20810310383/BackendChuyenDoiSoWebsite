const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

const encryptResponseMiddleware = require('./middleware/encryptResponseMiddleware');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files (Đặt TRƯỚC encryptResponseMiddleware để phục vụ trực tiếp file ảnh binary tĩnh)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Mã hóa JSON response cho các API endpoints
app.use(encryptResponseMiddleware);

// Routes
const authRoutes = require('./routes/authRoutes');
const truSoHanhChinhRoutes = require('./routes/truSoHanhChinhRoutes');
const thonRoutes = require('./routes/thonRoutes');
const userRoutes = require('./routes/userRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const phanQuyenRoutes = require('./routes/phanQuyenRoutes');
const caiDatRoutes = require('./routes/caiDatRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tru-so-hanh-chinh', truSoHanhChinhRoutes);
app.use('/api/thon', thonRoutes);
app.use('/api/users', userRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/phan-quyen', phanQuyenRoutes);
app.use('/api/cai-dat', caiDatRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: 'Backend ChuyenDoiSo API đang hoạt động!',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Error Middleware]:', err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Lỗi Máy Chủ Nội Bộ!'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`Server đang chạy trên port: ${PORT}`);
  console.log(`=================================`);
});

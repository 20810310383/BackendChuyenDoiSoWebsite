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
app.use(encryptResponseMiddleware);

// Serve Static Files (Thư mục upload ảnh)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const truSoHanhChinhRoutes = require('./routes/truSoHanhChinhRoutes');
const thonRoutes = require('./routes/thonRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tru-so-hanh-chinh', truSoHanhChinhRoutes);
app.use('/api/thon', thonRoutes);
app.use('/api/users', userRoutes);

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

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`Server đang chạy trên port: ${PORT}`);
  console.log(`=================================`);
});

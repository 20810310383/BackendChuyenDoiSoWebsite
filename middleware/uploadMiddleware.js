const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../public/uploads/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'upload-' + uniqueSuffix + ext);
  }
});

// Image-only filter (ảnh đại diện, banner, avatar, logo...)
const imageFilter = (req, file, cb) => {
  const allowedExt = /jpeg|jpg|png|gif|webp|svg/;
  const extname = allowedExt.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith('image/');
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép tải lên file hình ảnh (jpeg, jpg, png, gif, webp, svg)!'));
  }
};

// Media filter — ảnh + video + audio (dùng cho trình soạn thảo TinyMCE)
const mediaFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith('image/');
  const isVideo = file.mimetype.startsWith('video/');
  const isAudio = file.mimetype.startsWith('audio/');
  if (isImage || isVideo || isAudio) {
    return cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép tải lên file hình ảnh, video hoặc audio!'));
  }
};

// Upload mặc định (chỉ ảnh)
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: imageFilter
});

// Upload media cho TinyMCE editor (ảnh + video + audio)
const uploadMedia = multer({
  storage: storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
  fileFilter: mediaFilter
});

module.exports = upload;
module.exports.uploadMedia = uploadMedia;

const { encryptData } = require('../utils/cryptoUtil');

const encryptResponseMiddleware = (req, res, next) => {
  // Ghi đè hàm res.json gốc của Express
  const originalJson = res.json;

  res.json = function (data) {
    // Nếu biến môi trường ENCRYPT_RESPONSES tắt, trả về dữ liệu thô
    if (process.env.ENCRYPT_RESPONSES === 'false') {
      return originalJson.call(this, data);
    }

    // Nếu dữ liệu đã được mã hóa trước đó, giữ nguyên
    if (data && data.encrypted && data.payload) {
      return originalJson.call(this, data);
    }

    try {
      // Mã hóa toàn bộ object response thành chuỗi AES
      const encryptedPayload = encryptData(data);

      return originalJson.call(this, {
        encrypted: true,
        payload: encryptedPayload
      });
    } catch (error) {
      console.error('[Encrypt Response Middleware Error]:', error);
      return originalJson.call(this, data);
    }
  };

  next();
};

module.exports = encryptResponseMiddleware;

const CryptoJS = require('crypto-js');

// Lấy key mã hóa từ .env (Mặc định lấy ENCRYPTION_SECRET hoặc JWT_SECRET)
const getSecretKey = () => {
  return process.env.ENCRYPTION_SECRET || process.env.JWT_SECRET || 'fallback_secret_key_2026';
};

// Hàm mã hóa Object/String thành chuỗi AES băm bảo mật
exports.encryptData = (data) => {
  if (data === undefined || data === null) return data;
  try {
    const jsonString = typeof data === 'object' ? JSON.stringify(data) : String(data);
    return CryptoJS.AES.encrypt(jsonString, getSecretKey()).toString();
  } catch (error) {
    console.error('[Crypto Encrypt Error]:', error);
    return data;
  }
};

// Hàm giải mã chuỗi AES băm ngược lại Object/String
exports.decryptData = (ciphertext) => {
  if (!ciphertext) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, getSecretKey());
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error('[Crypto Decrypt Error]:', error);
    return null;
  }
};

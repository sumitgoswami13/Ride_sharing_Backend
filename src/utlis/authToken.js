const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';
function generateToken(user) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
}

function decryptToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { success: true, decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = {
  generateToken,
  decryptToken
};

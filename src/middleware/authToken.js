const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

function generateToken(user) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
}

function decryptToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.decodedToken = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired', error: error.message });
  }
}

module.exports = {
  generateToken,
  decryptToken
};

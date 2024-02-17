const jwt = require('jsonwebtoken');
const { verifyToken } = require('../service/JwtService');

// Middleware xác minh token
const authenticateToken = (req, res, next) => {
    const token = req.headers.header.split(' ')[1];
    if (!token) {
        return res.status(401).json({ EM: 'Unauthorized', EC: 1 });
    }
    verifyToken(token)
        .then((user) => {
            console.log(user)
            req.user = user; // Lưu thông tin người dùng vào đối tượng request để sử dụng trong route handlers
            next();
        })
        .catch((err) => {
            res.status(403).json({ EM: 'Forbidden', EC: 1 });
        });
};

module.exports = authenticateToken;
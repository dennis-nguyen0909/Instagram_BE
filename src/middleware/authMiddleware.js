const jwt = require('jsonwebtoken');
const { verifyToken } = require('../service/JwtService');
const HttpStatusCode = require('../exceptions/HttpStatusCode')
// Middleware xác minh token
const authenticateToken = (req, res, next) => {
    const token = req.headers.header.split(' ')[1];
    if (!token) {
        return res.status(HttpStatusCode.NOT_AUTHENTICATION).json({ EM: 'Unauthorized', EC: 1 });
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
const authUserMiddleware = async (req, res, next) => {
    try {
        const userId = req.body.userId
        const token = req.headers.header.split(" ")[1]
        if (!token) {
            return res.status(HttpStatusCode.NOT_AUTHENTICATION).json({ EM: 'Unauthorized', EC: 1 });
        }
        const result = await verifyToken(token);
        if (result === userId) {
            console.log('ok')
            next()
        } else {
            res.status(HttpStatusCode.NOT_AUTHENTICATION).json({
                message: 'Lỗi authentication'
            })
        }
    } catch (error) {

    }
}

module.exports = authenticateToken;
module.exports = authUserMiddleware;
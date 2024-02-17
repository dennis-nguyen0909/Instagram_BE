const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    generalAccessToken: (payload) => {
        const accessToken = jwt.sign({
            ...payload
        }, process.env.ACCESS_TOKEN, { expiresIn: '10s' })
        return accessToken;
    },
    generalRefreshToken: (payload) => {
        const refreshToken = jwt.sign({
            ...payload
        }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
        return refreshToken;
    },
    refreshTokenService: (token) => {
        console.log(token)
        return new Promise((resolve, reject) => {
            try {
                jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                    if (err) {
                        resolve({
                            status: 'Error',
                            message: "Không có quyền truy cập"
                        })
                    }
                    // Cấp lại access token mới
                    const access_token = await generalAccessToken({
                        id: user?.id,
                        isAdmin: user?.isAdmin
                    })

                    resolve({
                        status: 'Ok',
                        message: " Success!!",
                        access_token
                    })
                })
            } catch (error) {
                reject(error)
            }
        })
    },
    verifyToken: (token) => {
        console.log(token)
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    const tokenUser = user.id;
                    resolve(tokenUser);
                }
            });
        });
    }
}





const JwtService = require("../service/JwtService");
const { sendEmailGenerateAuth } = require("../service/NodeMailer");
const UserService = require("../service/UserService")

module.exports = {
    create: async (req, res) => {
        try {
            const { email, password, userName, fullName, confirmPassword } = req.body

            const response = await UserService.create(email, password, userName, fullName, confirmPassword);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(500).json({ error })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const data = await UserService.login(email, password);
            const { refresh_token, ...newData } = data
            res.cookie('jwt', refresh_token, {
                httpOnly: true,
                secure: false,
                // sameSite: 'strict',
                // path: '/'
            })
            return res.status(200).json({
                data: newData, refresh_token
            })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
    , getDetailUser: async (req, res) => {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(200).json({
                    message: "User is not defined!",
                    status: "Error"
                })
            }
            const response = await UserService.getDetailUser(userId);
            return res.status(200).json({ response })

        } catch (error) {
            return res.status(500).json({ error })

        }
    }
    , refreshToken: async (req, res) => {
        try {
            const token = req.body.headers.token.split(' ')[1];
            // const token = req.cookie.refresh_token
            if (!token) {
                return res.status(200).json({
                    status: 'Lỗi',
                    message: "Không có token"
                })
            }
            const response = await JwtService.refreshTokenService(token);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(500).json({ error })
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            const data = req.body
            // console.log(data, id)
            const response = await UserService.update(id, data);

            return res.status(200).json({
                response
            })
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    sendMailAuth: async (req, res) => {
        try {
            const { email } = req.body
            console.log(req.body)
            const response = await UserService.sendMailAuth(email);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(500).json({ error })
        }
    },
    updateBirthday: async (req, res) => {
        try {
            const { birthday, id } = req.body
            const response = await UserService.updateBirthday(birthday, id);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(500).json({ error })

        }
    },
    logoutUser: async (req, res) => {
        try {

            res.clearCookie("jwt")
            res.status(200).json({
                EM: "Logout SuccessFully!",
                EC: 0
            })
        } catch (error) {
            return res.status(500).json({ error })

        }
    }
}
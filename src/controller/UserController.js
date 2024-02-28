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
    }, getAllUser: async (req, res) => {
        try {
            const response = await UserService.getAllUser();
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(200).json(error)

        }
    }, handleFollow: async (req, res) => {
        try {
            const currentUserId = req.body.currentUserId;
            const userId = req.params.id;


            const response = await UserService.handleFollow(userId, currentUserId);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(200).json(error)
        }
    }, handleUnFollow: async (req, res) => {
        try {
            const currentUserId = req.body.currentUserId;
            const userId = req.params.id;
            const response = await UserService.handleUnFollow(userId, currentUserId);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(200).json(error)
        }
    }, getNotFriends: async (req, res) => {
        try {
            const userId = req.params.id;
            const response = await UserService.getNotFriends(userId);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(200).json(error)
        }
    }, getUserByUsername: async (req, res) => {
        try {
            const username = req.query.username;
            const response = await UserService.getUserByUsername(username);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(200).json(error)
        }
    }, getFriends: async (req, res) => {
        try {
            const userId = req.params.id;
            const response = await UserService.getFriends(userId);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(200).json(error)
        }
    }

}
const JwtService = require("../service/JwtService");
const PostService = require("../service/PostService");


module.exports = {
    create: async (req, res) => {
        try {
            const { id, desc, images } = req.body
            const response = await PostService.create(id, desc, images);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(500).json({ error })
        }
    },
    delete: async (req, res) => {
        try {

            const postId = req.params.id
            const token = req.headers.token.split(' ')[1]

            const response = await PostService.delete(postId, token);
            return res.status(200).json({ response })

        } catch (error) {
            return res.status(500).json({ error })
        }
    }
    , getDetailPost: async (req, res) => {
        try {
            const postId = req.params.id;
            if (!postId) {
                return res.status(200).json({
                    message: "Post is not defined!",
                    status: "Error"
                })
            }
            const response = await PostService.getDetailPost(postId);
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
            const token = req.headers.header.split(' ')[1]


            const response = await PostService.update(id, data, token);
            return res.status(200).json({
                response
            })
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    }, getAll: async (req, res) => {
        try {
            const response = await PostService.getAll();
            return res.status(200).json({
                response
            })
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    },
    like: async (req, res) => {
        try {
            const postId = req.params.id

            const userId = req.body.userId

            const response = await PostService.like(postId, userId);
            return res.status(200).json({
                response
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            })
        }
    },
    unLike: async (req, res) => {
        try {
            const postId = req.params.id
            const userId = req.body.userId
            const response = await PostService.unLike(postId, userId);
            return res.status(200).json({
                response
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            })
        }
    }, likePost: async (req, res) => {
        try {
            const postId = req.params.id
            const userId = req.body.userId
            const response = await PostService.likePost(postId, userId);
            return res.status(200).json({
                response
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            })
        }
    }, commentsPost: async (req, res) => {
        try {
            const postId = req.params.id
            const userId = req.body.userId
            const comment = req.body.comment
            const response = await PostService.commentsPost(postId, userId, comment);

            return res.status(200).json({
                response
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }, getPostByUser: async (req, res) => {
        try {
            const userId = req.params.id
            console.log(Object.toString(userId))
            const response = await PostService.getPostByUser(userId);

            return res.status(200).json({
                response
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}

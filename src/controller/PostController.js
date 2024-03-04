const JwtService = require("../service/JwtService");
const PostService = require("../service/PostService");

const HttpStatusCode = require('../exceptions/HttpStatusCode')
module.exports = {
    create: async (req, res) => {
        try {
            const { id, desc, images } = req.body
            const response = await PostService.create(id, desc, images);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    },
    delete: async (req, res) => {
        try {

            const postId = req.params.id
            const token = req.headers.token.split(' ')[1]

            const response = await PostService.delete(postId, token);
            return res.status(HttpStatusCode.OK).json({ response })

        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }
    , getDetailPost: async (req, res) => {
        try {
            const postId = req.params.id;
            if (!postId) {
                return res.status(HttpStatusCode.OK).json({
                    message: "Post is not defined!",
                    status: "Error"
                })
            }
            const response = await PostService.getDetailPost(postId);
            return res.status(HttpStatusCode.OK).json({ response })

        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })

        }
    }
    , refreshToken: async (req, res) => {
        try {
            const token = req.body.headers.token.split(' ')[1];
            // const token = req.cookie.refresh_token
            if (!token) {
                return res.status(HttpStatusCode.OK).json({
                    status: 'Lỗi',
                    message: "Không có token"
                })
            }
            const response = await JwtService.refreshTokenService(token);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            const data = req.body
            const token = req.headers.header.split(' ')[1]


            const response = await PostService.update(id, data, token);
            return res.status(HttpStatusCode.OK).json({
                response
            })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                error
            })
        }
    }, getAll: async (req, res) => {
        try {
            const response = await PostService.getAll();
            return res.status(HttpStatusCode.OK).json({
                response
            })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                error
            })
        }
    },
    like: async (req, res) => {
        try {
            const postId = req.params.id

            const userId = req.body.userId

            const response = await PostService.like(postId, userId);
            return res.status(HttpStatusCode.OK).json({
                response
            })
        } catch (error) {
            console.log(error)
            return res.status(HttpStatusCode.NOT_FOUND).json({
                error
            })
        }
    },
    unLike: async (req, res) => {
        try {
            const postId = req.params.id
            const userId = req.body.userId
            console.log(postId, userId)

            const response = await PostService.unLike(postId, userId);
            return res.status(HttpStatusCode.OK).json({
                response
            })
        } catch (error) {
            console.log(error)
            return res.status(HttpStatusCode.NOT_FOUND).json({
                error
            })
        }
    }, likePost: async (req, res) => {
        try {
            const postId = req.params.id
            const userId = req.body.userId
            console.log(postId, userId)
            const response = await PostService.likePost(postId, userId);
            return res.status(HttpStatusCode.OK).json({
                response
            })
        } catch (error) {
            console.log(error)
            return res.status(HttpStatusCode.NOT_FOUND).json({
                error
            })
        }
    }, commentsPost: async (req, res) => {
        try {
            const postId = req.params.id
            const userId = req.body.userId
            const comment = req.body.comment
            const response = await PostService.commentsPost(postId, userId, comment);

            return res.status(HttpStatusCode.OK).json({
                response
            })
        } catch (error) {
            console.log(error)
            return res.status(HttpStatusCode.NOT_FOUND).json(error)
        }
    }, getPostByUser: async (req, res) => {
        try {
            const userId = req.params.id
            console.log(userId)
            const response = await PostService.getPostByUser(userId);

            return res.status(HttpStatusCode.OK).json({
                response
            })
        } catch (error) {
            console.log(error)
            return res.status(HttpStatusCode.NOT_FOUND).json(error)
        }
    }, handleUploadImages: async (req, res) => {
        try {
            const files = req.files
            const response = await PostService.handleUploadImages(files);

            return res.status(HttpStatusCode.OK).json({
                response
            })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json(error)
        }
    }, handleUploadVideos: async (req, res) => {
        try {
            const file = req.file
            const response = await PostService.handleUploadVideos(file);

            return res.status(HttpStatusCode.OK).json({
                response
            })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json(error)
        }
    }
}

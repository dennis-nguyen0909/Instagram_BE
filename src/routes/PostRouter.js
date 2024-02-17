const express = require('express')
const PostController = require('../controller/PostController');
const { authUserMiddleWare } = require('../middleware/authMiddleware');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router()


const PostRouter = (app) => {
    router.post('/create', PostController.create);
    router.delete('/delete/:id', PostController.delete);
    router.get('/get-detail/:id', PostController.getDetailPost);
    router.put('/update/:id', authenticateToken, PostController.update);
    router.get('/get-all', PostController.getAll);
    router.put('/:id/like', PostController.like);
    router.put('/like-post/:id', PostController.likePost);
    router.put('/un-like/:id', PostController.unLike);
    return app.use('/api/post', router)
}

module.exports = PostRouter
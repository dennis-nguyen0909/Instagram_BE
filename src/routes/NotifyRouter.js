const express = require('express')
const PostController = require('../controller/PostController');
const { authUserMiddleWare } = require('../middleware/authMiddleware');
const authenticateToken = require('../middleware/authMiddleware');
const NotifyController = require('../controller/NotifyController');
const router = express.Router()


const NotifyRouter = (app) => {
    router.post('/create', NotifyController.create);
    router.get('/get-by-id/:id',NotifyController.getById);
    return app.use('/api/notify', router)
}

module.exports = NotifyRouter
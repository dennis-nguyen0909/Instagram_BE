const express = require('express')
const ReelController = require('../controller/ReelController');
const authUserMiddleware = require('../middleware/authMiddleware');
const router = express.Router()


const ReelRouter = (app) => {
    router.post('/create', ReelController.handleCreateReel);
    router.delete('/delete/:id', ReelController.handleDeleteReel);
    router.put('/update/:id', authUserMiddleware, ReelController.handleUpdateReel);
    router.get('/get-detail/:id', ReelController.handleGetDetail);
    router.get('/get-all', ReelController.handleGetAll);
    router.put('/like/:id', ReelController.handleLikeReel);
    router.put('/comment/:id', ReelController.handleCommentReel);
    return app.use('/api/reel', router)
}

module.exports = ReelRouter
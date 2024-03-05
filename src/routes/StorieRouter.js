const express = require('express')
const router = express.Router()
const StoriesController = require("../controller/StorieController")

const StoriesRouter = (app) => {
    router.post('/create', StoriesController.handleCreateStories);
    router.delete('/delete/:id', StoriesController.handleDeleteStories);
    router.put('/update/:id', StoriesController.handleUpdateStories);
    router.put('/view/:id', StoriesController.handleViewStories);
    router.get('/get-all', StoriesController.handleGetAll);
    router.put('/like/:id', StoriesController.handleLike);
    router.get('/get-detail/:id', StoriesController.handleGetDetail);
    router.put('/comments/:id', StoriesController.handleComments);
    return app.use('/api/stories', router)
}

module.exports = StoriesRouter
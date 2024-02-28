const express = require('express')

const router = express.Router()
const MessageController = require('../controller/MessageController')

const MessageRouter = (app) => {
    router.post('/create', MessageController.createMessage);
    router.get('/get-message/:id', MessageController.getMessageById);
    return app.use('/api/message', router)
}

module.exports = MessageRouter
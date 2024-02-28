const express = require('express')

const router = express.Router()
const MessageController = require('../controller/MessageController');
const ChatController = require('../controller/ChatController');

const ChatRouter = (app) => {
    router.post('/create', ChatController.createChat);
    router.get('/:id', ChatController.getUserChats);
    router.get('/find/:firstId/:secondId', ChatController.findChat);

    return app.use('/api/chat', router)
}

module.exports = ChatRouter
const ChatService = require("../service/ChatService");
const HttpStatusCode = require('../exceptions/HttpStatusCode')
module.exports = {
    createChat: async (req, res) => {
        try {
            const senderId = req.body.senderId
            const receiverId = req.body.receiverId
            console.log(req.body)
            const response = await ChatService.createChat(senderId, receiverId);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json(error)
        }
    }, getUserChats: async (req, res) => {
        try {
            const id = req.params.id
            const response = await ChatService.getUserChats(id);
            return res.status(HttpStatusCode.OK).json({ response })

        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json(error)
        }
    }, findChat: async (req, res) => {
        try {
            const firstId = req.params.firstId
            const secondId = req.params.secondId
            const response = await ChatService.findChat(firstId, secondId);
            return res.status(HttpStatusCode.OK).json({ response })

        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json(error)
        }
    }
}
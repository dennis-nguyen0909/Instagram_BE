const ChatService = require("../service/ChatService");

module.exports = {
    createChat: async (req, res) => {
        try {
            const senderId = req.body.senderId
            const receiverId = req.body.receiverId
            console.log(req.body)
            const response = await ChatService.createChat(senderId, receiverId);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(404).json(error)
        }
    }, getUserChats: async (req, res) => {
        try {
            const id = req.params.id
            const response = await ChatService.getUserChats(id);
            return res.status(200).json({ response })

        } catch (error) {
            return res.status(404).json(error)
        }
    }, findChat: async (req, res) => {
        try {
            const firstId = req.params.firstId
            const secondId = req.params.secondId
            const response = await ChatService.findChat(firstId, secondId);
            return res.status(200).json({ response })

        } catch (error) {
            return res.status(404).json(error)
        }
    }
}
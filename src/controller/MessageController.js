const MessageService = require('../service/MessageService')
module.exports = {
    createMessage: async (req, res) => {
        try {
            const { senderId, chatId, text } = req.body;
            const response = await MessageService.createMessage(senderId, chatId, text);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(404).json(error)
        }
    }, getMessageById: async (req, res) => {
        try {
            const id = req.params.id
            const response = await MessageService.getMessageById(id);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(404).json(error)
        }
    }
}
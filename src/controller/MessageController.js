const MessageService = require('../service/MessageService')
const HttpStatusCode = require('../exceptions/HttpStatusCode')
module.exports = {
    createMessage: async (req, res) => {
        try {
            const { senderId, chatId, text } = req.body;
            const response = await MessageService.createMessage(senderId, chatId, text);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json(error)
        }
    }, getMessageById: async (req, res) => {
        try {
            const id = req.params.id
            const response = await MessageService.getMessageById(id);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json(error)
        }
    }
}
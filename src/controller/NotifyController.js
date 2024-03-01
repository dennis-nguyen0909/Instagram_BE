const Notify = require('../model/NotifyModel');
const NotifyService = require('../service/NotifyService');
const HttpStatusCode = require('../exceptions/HttpStatusCode')
module.exports = {
    create: async (req, res) => {
        try {

            const { ownerId, postId, avatar, message, userId } = req.body
            console.log(req.body)
            const response = await NotifyService.create(userId, postId, avatar, ownerId, message);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    },
    getById: async (req, res) => {
        try {
            const userId = req.params.id

            const response = await NotifyService.getById(userId);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }
}
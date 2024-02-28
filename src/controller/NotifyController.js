const Notify = require('../model/NotifyModel');
const NotifyService = require('../service/NotifyService');

module.exports = {
    create: async (req, res) => {
        try {

            const { ownerId, postId, avatar, message, userId } = req.body
            console.log(req.body)
            const response = await NotifyService.create(userId, postId, avatar, ownerId, message);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(500).json({ error })
        }
    },
    getById: async (req, res) => {
        try {
            const userId = req.params.id

            const response = await NotifyService.getById(userId);
            return res.status(200).json({ response })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
}
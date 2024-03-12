const HttpStatusCode = require("../exceptions/HttpStatusCode")
const ReelService = require('../service/ReelService')
module.exports = {
    handleCreateReel: async (req, res) => {
        try {
            const { userId, videoUrl, caption } = req.body
            const response = await ReelService.handleCreateReel(userId, videoUrl, caption);
            return res.status(HttpStatusCode.OK).json({ response });

        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }, handleDeleteReel: async (req, res) => {
        try {
            const id = req.params.id
            const response = await ReelService.handleDeleteReel(id);
            return res.status(HttpStatusCode.OK).json({ response });

        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }, handleGetDetail: async (req, res) => {
        try {
            const id = req.params.id
            const response = await ReelService.handleGetDetail(id);
            return res.status(HttpStatusCode.OK).json({ response });

        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }, handleUpdateReel: async (req, res) => {
        try {
            const id = req.params.id
            const { userId, videoUrl, caption } = req.body
            const response = await ReelService.handleUpdateReel(id, userId, videoUrl, caption);
            return res.status(HttpStatusCode.OK).json({ response });

        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }, handleGetAll: async (req, res) => {
        try {
            const response = await ReelService.handleGetAll();
            return res.status(HttpStatusCode.OK).json({ response });

        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }, handleLikeReel: async (req, res) => {
        try {
            const idReel = req.params.id
            const idUser = req.body.idUser
            const response = await ReelService.handleLikeReel(idUser, idReel);
            return res.status(HttpStatusCode.OK).json({ response });

        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }, handleCommentReel: async (req, res) => {
        try {
            const idReel = req.params.id
            const idUser = req.body.idUser
            const comment = req.body.comment
            const response = await ReelService.handleCommentReel(idUser, idReel, comment);
            return res.status(HttpStatusCode.OK).json({ response });

        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }, getReelByUser: async (req, res) => {
        try {
            const idUser = req.params.id
            const response = await ReelService.getReelByUser(idUser);
            return res.status(HttpStatusCode.OK).json({ response });

        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }
}
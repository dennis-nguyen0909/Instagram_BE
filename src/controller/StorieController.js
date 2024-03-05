const HttpStatusCode = require("../exceptions/HttpStatusCode")
const Stories = require("../model/Stories/StoryModel")
const StoriesService = require("../service/StoriesService")


module.exports = {
    handleCreateStories: async (req, res) => {
        try {

            const { userId, mediaType, mediaURL, caption } = req.body
            const response = await StoriesService.handleCreateStories(userId, mediaType, mediaURL, caption);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }, handleDeleteStories: async (req, res) => {
        try {
            const id = req.params.id
            const response = await StoriesService.handleDeleteStories(id);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    },
    handleUpdateStories: async (req, res) => {
        try {
            const id = req.params.id
            const response = await StoriesService.handleUpdateStories(id);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }, handleViewStories: async (req, res) => {
        try {
            const storyID = req.params.id
            const { userId } = req.body
            const response = await StoriesService.handleViewStories(userId, storyID);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }, handleGetAll: async (req, res) => {
        try {
            const response = await StoriesService.handleGetAll();
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }, handleLike: async (req, res) => {
        try {
            const userId = req.params.id
            const storyId = req.body.storyId
            const response = await StoriesService.handleLike(userId, storyId);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            console.log(error)
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }, handleGetDetail: async (req, res) => {
        try {
            const storyID = req.params.id
            const response = await StoriesService.handleGetDetail(storyID);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            console.log(error)
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }, handleComments: async (req, res) => {
        try {
            const storyID = req.params.id
            const { userId, text } = req.body
            const response = await StoriesService.handleComments(storyID, userId, text);
            return res.status(HttpStatusCode.OK).json({ response })
        } catch (error) {
            console.log(error)
            return res.status(HttpStatusCode.NOT_FOUND).json({ error })
        }
    }
}
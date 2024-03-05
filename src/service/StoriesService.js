const ViewStories = require("../model/Stories/StoriesView")
const Stories = require("../model/Stories/StoryModel")

module.exports = {
    handleCreateStories: (userId, mediaType, mediaURL, caption) => {
        return new Promise(async (resolve, reject) => {
            try {

                const stories = await Stories.create({
                    userId, mediaType, mediaURL, caption
                })
                console.log(stories)
                resolve({
                    code: 200,
                    message: "Success",
                    data: stories
                })
            } catch (error) {
                reject(error)
            }
        })
    },
    handleDeleteStories: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const story = await Stories.findByIdAndDelete(id);
                if (!story) {
                    resolve({
                        code: 200,
                        message: "Not Found",

                    })
                } else {
                    resolve({
                        code: 200,
                        message: "Delete Successfully!",

                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    handleUpdateStories: () => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve({
                    code: 200,
                    message: "Success",

                })
            } catch (error) {
                reject(error)
            }
        })
    }, handleViewStories: (userId, storyID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const story = await Stories.findById(storyID)
                console.log(story)
                if (!story) {
                    resolve({
                        code: 200,
                        message: "Not found!",
                    })
                }
                if (!story.viewUsers.includes(userId)) {
                    const storyView = await Stories.findByIdAndUpdate(story, {
                        $addToSet: { viewUsers: userId }
                    }, { new: true })
                    console.log(storyView)
                    resolve({
                        code: 200,
                        message: "Success",
                        data: storyView
                    })
                } else {
                    resolve({
                        code: 200,
                        message: "Not view",

                    })
                }

            } catch (error) {
                reject(error)
            }
        })
    }, handleGetAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const stories = await Stories.find().sort({ createdAt: -1 })
                resolve({
                    code: 200,
                    message: "Success",
                    data: stories
                })
            } catch (error) {
                reject(error)
            }
        })
    }, handleLike: (userId, storyId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const story = await Stories.findById(storyId);
                if (!story) {
                    resolve({
                        code: 200,
                        message: "Not found!",
                    })
                }
                console.log(userId)
                console.log(storyId)
                console.log("story", !story.likes?.includes(userId))
                if (!story?.likes?.includes(userId)) {

                    const storyLike = await Stories.findByIdAndUpdate(storyId, {
                        $addToSet: { likes: userId }
                    }, { new: true })
                    const stories = await Stories.findById(storyId).populate('likes')
                    console.log("like", stories)
                    resolve({
                        code: 200,
                        message: "Like success!",
                        data: storyLike
                    })
                } else {
                    const storyUnlike = await Stories.findByIdAndUpdate(storyId, {
                        $pull: { likes: userId }
                    }, { new: true })
                    const stories = await Stories.findById(storyId).populate('likes')
                    console.log("un", stories)

                    resolve({
                        code: 200,
                        message: "UnLike success!",
                        data: storyUnlike
                    })
                }

            } catch (error) {
                reject(error)
            }
        })
    }, handleGetDetail: (storyID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const story = await Stories.findById(storyID);
                if (!story) {
                    resolve({
                        code: 200,
                        message: "Not found!",
                    })
                } else {
                    resolve({
                        code: 200,
                        message: "Find success!",
                        data: story
                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    }, handleComments: (storyID, userId, text) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(userId, text)
                const story = await Stories.findByIdAndUpdate(storyID, {
                    $push: { comments: { text: text, postedBy: userId } }
                }, { new: true })
                console.log(story)
                if (!story) {
                    resolve({
                        code: 200,
                        message: "Not found!",
                    })
                }
                resolve({
                    code: 200,
                    message: "Find success!",
                    data: story
                })

            } catch (error) {
                reject(error)
            }
        })
    }
}
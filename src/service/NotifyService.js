const Notify = require("../model/NotifyModel");
const PostModel = require("../model/PostModel");
const User = require("../model/UserModel")


module.exports = {
    create: (userId, postId, avatar, notify, userPost) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    resolve({
                        EC: 1,
                        EM: 'User not found'
                    })
                }
                const post = await PostModel.findById(postId);
                if (!post) {
                    resolve({
                        EC: 0,
                        EM: 'Post Not Found!'
                    })
                }
                const notifyObj = await Notify.create({
                    userId,
                    postId,
                    message: notify,
                    avatar,
                    ownerId: userPost
                });
                if (notifyObj) {
                    resolve({
                        EC: 0,
                        EM: 'CREATE SUCCESS',
                        data: notifyObj
                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    getById: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const notify = await Notify.find({ ownerId: userId });
                resolve({
                    EC: 0,
                    EM: 'Success',
                    data: notify
                })

            } catch (error) {
                reject(error)

            }
        })
    }
}
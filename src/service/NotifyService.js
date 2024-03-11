const Notify = require("../model/NotifyModel");
const PostModel = require("../model/PostModel");
const User = require("../model/UserModel")
const main = require('../index')

module.exports = {
    create: (userId, postId, avatar, ownerId, message) => {
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
                    message,
                    avatar,
                    ownerId
                });
                // Populate the userId and ownerId fields with user names
                let result = await notifyObj.populate('userId', 'userName name avatar');
                result = await notifyObj.populate('ownerId', 'userName name avatar');
                // notifyObj = await notifyObj.populate('ownerId', 'name').execPopulate();
                result.message = result.userId.userName + " đã thích bài viết của bạn"
                result.save();
                // Only emit to the owner if the liker is not the owner

                main.io.emit('new-notify-like', result);


                if (result) {
                    resolve({
                        EC: 0,
                        EM: 'CREATE SUCCESS',
                        data: result
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
                const notify = await Notify.find({ ownerId: userId }).sort({ createdAt: -1 })
                    .populate("userId", "userName avatar")
                    .populate("ownerId", "userName avatar")
                    .populate("postId", "images desc");
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
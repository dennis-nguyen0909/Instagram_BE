const Notify = require("../model/NotifyModel");
const PostModel = require("../model/PostModel");
const User = require("../model/UserModel")
const main = require('../index')

module.exports = {
    create: (userId, postId, avatar, ownerId, message) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(userId, postId, avatar, ownerId, message)
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
                let result = await notifyObj.populate('userId', 'name');
                result = await notifyObj.populate('ownerId', 'name');
                // notifyObj = await notifyObj.populate('ownerId', 'name').execPopulate();
                result.message = result.userId.name + " Đã like bài viết của bạn"

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
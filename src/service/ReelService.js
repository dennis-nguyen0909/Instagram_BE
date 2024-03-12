const Reel = require("../model/ReelModel")
const User = require("../model/UserModel")
const main = require('../index')
const { text } = require("body-parser")

module.exports = {
    handleCreateReel: (userId, videoUrl, caption) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(userId);

                const reel = await Reel.create({
                    userId, videoUrl, caption
                });
                user.reels.push(reel._id);
                await user.save();
                if (reel) {

                    resolve({
                        EC: 0,
                        EM: 'Success',
                        data: reel
                    })
                }


            } catch (error) {
                reject(error)

            }
        })
    }, handleDeleteReel: (id) => {
        return new Promise(async (resolve, reject) => {
            try {


                const deleted = await Reel.findByIdAndDelete(id);

                if (!deleted) {
                    resolve({
                        code: 404,
                        message: 'Not found !!!',
                    })
                }
                resolve({
                    code: 200,
                    message: 'Delete !!!',
                    data: deleted
                })

            } catch (error) {
                reject(error)

            }
        })
    }, handleGetDetail: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const findReel = await Reel.findById(id);
                if (!findReel) {
                    resolve({
                        code: 404,
                        message: 'Not found !!!',
                    })
                }
                resolve({
                    code: 200,
                    message: 'Find success !!!',
                    data: findReel
                })

            } catch (error) {
                reject(error)

            }
        })
    }, handleUpdateReel: (id, userId, videoUrl, caption) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updated = await Reel.findByIdAndUpdate(id, { caption: caption }, { new: true });
                console.log(id, caption);
                if (!updated) {
                    resolve({
                        code: 404,
                        message: 'Not found !!!',
                    });
                }
                console.log(updated);
                resolve({
                    code: 200,
                    message: 'Update success !!!',
                    data: updated
                });
            } catch (error) {
                reject(error);
            }
        });

    }, handleGetAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const getAll = await Reel.find().sort({ createdAt: -1 })
                    .populate('userId', 'userName avatar , email')
                    .populate('likes', 'userName avatar')
                    .populate('comments.postedBy', 'userName email avatar');
                if (!getAll) {
                    resolve({
                        code: 404,
                        message: 'Not found !!!',
                    })
                }
                resolve({
                    code: 200,
                    message: 'Get All !!!',
                    data: getAll
                })

            } catch (error) {
                reject(error)

            }
        })
    }, handleLikeReel: (idUser, idReel) => {
        return new Promise(async (resolve, reject) => {
            try {
                const reel = await Reel.findById(idReel);
                console.log(reel)
                console.log(idUser)
                if (!reel.likes.includes(idUser)) {
                    const like = await Reel.findByIdAndUpdate(idReel, {
                        $addToSet: { likes: idUser }
                    }, { new: true })
                    if (like) {
                        const likeReel = await Reel.find().sort({ createdAt: -1 }).populate('likes', 'userName avatar email')
                        main.io.emit('like-reel', likeReel)
                        resolve({
                            code: 200,
                            message: 'Like success',
                            data: like
                        })
                    }
                } else {
                    const unLike = await Reel.findByIdAndUpdate(idReel, {
                        $pull: { likes: idUser }
                    }, { new: true })
                    if (unLike) {
                        const likeReel = await Reel.find().sort({ createdAt: -1 }).populate('likes', 'userName avatar email')

                        main.io.emit('unlike-reel', likeReel)
                        resolve({
                            code: 200,
                            message: 'unLike success',
                            data: unLike
                        })
                    }
                }
            } catch (error) {
                reject(error)

            }
        })
    }, handleCommentReel: (idUser, idReel, comment) => {
        return new Promise(async (resolve, reject) => {
            try {
                const reel = await Reel.findById(idReel);
                if (!reel) {
                    resolve({
                        code: 200,
                        message: 'Reel notfound',
                    })
                } else {
                    const commentReel = await Reel.findByIdAndUpdate(idReel, {
                        $push: { comments: { text: comment, postedBy: idUser } }
                    }, { new: true }).populate('comments.postedBy', 'userName email avatar')
                    console.log(commentReel)
                    if (commentReel) {
                        main.io.emit('new-comment', commentReel.comments)
                        resolve({
                            code: 200,
                            message: 'Comment reel success',
                            data: commentReel
                        })
                    }
                }
            } catch (error) {
                reject(error)

            }
        })
    }, getReelByUser: (idUser) => {
        return new Promise(async (resolve, reject) => {
            try {
                const reels = await Reel.find({ userId: idUser })
                    .populate("userId", "userName avatar")
                    .populate("likes", "userName avatar")
                    .populate('comments.postedBy', 'userName email avatar');
                if (!reels) {
                    resolve({
                        code: 200,
                        message: "Not found!",
                    })
                } else {
                    resolve({
                        code: 200,
                        message: "Find reels success!",
                        data: reels
                    })
                }
            } catch (error) {
                reject(error)

            }
        })
    }
}
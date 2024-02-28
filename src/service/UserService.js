const User = require('../model/UserModel')
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./JwtService');
const { sendEmailGenerateAuth } = require('./NodeMailer');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const main = require('../index')
require('dotenv').config()
module.exports = {
    create: (email, password, userName, fullName, confirmPassword) => {
        return new Promise(async (resolve, reject) => {
            try {
                const checkExistEmail = await User.findOne({
                    email: email
                })
                if (checkExistEmail !== null) {
                    resolve({
                        EM: 'Email is exist!!',
                        EC: 1,
                    })
                    return;
                }
                if (password !== confirmPassword) {
                    resolve({
                        EM: 'Confirm password not incorrect!',
                        EC: 1,
                    })
                    return;
                }
                const HashPass = bcrypt.hashSync(password, 10);
                const newUser = await User.create({
                    email: email,
                    name: fullName,
                    userName: userName,
                    password: HashPass,
                })
                if (newUser) {
                    resolve({
                        EM: 'OK',
                        EC: 0,
                        DT: newUser
                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    login: (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {

                const checkExistEmail = await User.findOne({ email: email });
                if (checkExistEmail === null) {
                    resolve({
                        EM: 'Email NOT exist!!',
                        EC: 1,
                    })
                }
                const comparePassword = bcrypt.compareSync(password, checkExistEmail.password);
                if (comparePassword === false) {
                    resolve({
                        EM: 'Password not correct!',
                        EC: 1,
                    })
                }
                const access_token = await generalAccessToken({
                    id: checkExistEmail.id,
                    isAdmin: checkExistEmail.isAdmin
                })
                const refresh_token = await generalRefreshToken({
                    id: checkExistEmail.id,
                    isAdmin: checkExistEmail.isAdmin
                })
                resolve({
                    EM: "Login Successfully",
                    EC: 0,
                    access_token,
                    refresh_token
                })
            } catch (error) {
                reject(error)
            }
        })
    },
    getDetailUser: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({
                    _id: id
                })
                if (user === null) {
                    resolve({
                        message: "User not defined!!",
                        status: "Error"
                    })
                }
                resolve({
                    status: 'Ok',
                    message: " Success!!",
                    data: user
                })
            } catch (error) {
                reject(error)
            }
        })
    },
    update: (id, data) => {
        return new Promise(async (resolve, reject) => {
            try {

                const checkUser = await User.findOne({ _id: id })
                if (checkUser === null) {
                    resolve({
                        EM: "Not found"
                    })
                }

                const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
                if (updateUser) {
                    resolve({
                        EM: "Update success !",
                        EC: 0,
                        updateUser
                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    sendMailAuth: (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                let authRandomOne;
                const data = sendEmailGenerateAuth(email)
                data.then((result) => {
                    authRandomOne = result.authRandom
                    resolve({
                        EM: 'OK',
                        EC: 0,
                        authRandomOne
                    })

                })

            } catch (error) {
                reject(error)
            }
        })
    },
    updateBirthday: (birthday, id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const checkId = await User.findOne({ _id: id })
                if (checkId === null) {
                    resolve({
                        EM: 'NOT FOUND EMAIL',
                        EC: 1
                    })
                    return;
                }
                const newUpdate = await User.findByIdAndUpdate(id, { birthday }, { new: true })
                if (newUpdate) {
                    resolve({
                        EM: 'SUCCESS',
                        EC: 0,
                        DT: newUpdate
                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    logoutUser: () => {
        return new Promise(async (resolve, reject) => {
            try {

                resolve({
                    EM: 'Logout Successfully',
                    EC: 0
                })
            } catch (error) {
                reject(error)

            }
        })
    }, getAllUser: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const allUser = await User.find();
                resolve({
                    EM: 'GET ALL USER',
                    EC: 0,
                    data: allUser
                })
            } catch (error) {
                reject(error)
            }
        })
    },
    handleFollow: (userId, currentUserId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userCurrent = await User.findById(currentUserId);
                const user = await User.findById(userId)

                if (!user || !userCurrent) {
                    resolve({
                        code: 404,
                        message: 'User not found!!',
                    });
                    return;
                }
                if (!user.followers.includes(currentUserId)) {
                    await user.updateOne({ $addToSet: { followers: currentUserId } })
                    await userCurrent.updateOne({ $addToSet: { followings: userId } })
                    const dataUserCurrent = await User.findById(currentUserId);
                    main.io.emit("follow", dataUserCurrent)
                    resolve({
                        code: 200,
                        message: 'Follow is successfully!',
                        data: dataUserCurrent
                    })
                } else {
                    resolve({
                        code: 404,
                        message: 'You  already follower this user !',

                    })
                }

            } catch (error) {
                reject(error)
            }
        })
    }, handleUnFollow: (userId, currentUserId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userCurrent = await User.findById(currentUserId);
                const user = await User.findById(userId)
                if (!user || !userCurrent) {
                    resolve({
                        code: 404,
                        message: 'User not found!!',
                    });
                    return;
                }
                if (user.followers.includes(currentUserId)) {
                    await user.updateOne({ $pull: { followers: currentUserId } })
                    await userCurrent.updateOne({ $pull: { followings: userId } })
                    const dataUserCurrent = await User.findById(currentUserId);
                    main.io.emit("un-follow", dataUserCurrent)

                    resolve({
                        code: 200,
                        message: 'unFollow is successfully!',
                        data: dataUserCurrent
                    })
                } else {
                    resolve({
                        code: 404,
                        message: 'You  already unFollower this user !',

                    })
                }

            } catch (error) {
                reject(error)
            }
        })
    }, getNotFriends: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Tìm người dùng dựa trên userId
                const user = await User.findById(userId);

                // Lấy danh sách id của những người mà userId đã follow
                const followingIds = user.followings.map(String);

                // Tìm tất cả người dùng mà userId chưa follow
                const notFollowingUsers = await User.find({
                    _id: { $nin: followingIds.concat(userId) } // Loại bỏ userId hiện tại
                });

                // Format dữ liệu
                const notFollowingList = notFollowingUsers.map((user) => {
                    const { _id, userName, avatar, name, email } = user;
                    return { _id, userName, avatar, name, email };
                });

                resolve({
                    EM: 'SUCCESS',
                    EC: 200,
                    data: notFollowingList
                });
            } catch (error) {
                reject(error);
            }
        });
    }, getUserByUsername: (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ userName: username })
                resolve({
                    EM: 'SUCCESS',
                    EC: 200,
                    data: user
                })
            } catch (error) {
                reject(error)
            }
        })
    }, getFriends: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(userId);
                const friends = await Promise.all(
                    user.followings.map((friend) => {
                        return User.findById(friend)
                    })
                )
                let listFriends = [];
                friends.map((item) => {
                    const { _id, name, userName, email, avatar } = item;
                    listFriends.push({ _id, name, userName, email, avatar });
                })
                resolve({
                    EM: 'SUCCESS',
                    code: 200,
                    data: listFriends
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}



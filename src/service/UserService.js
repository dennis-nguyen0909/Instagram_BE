const User = require('../model/UserModel')
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./JwtService');
const { sendEmailGenerateAuth } = require('./NodeMailer');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
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
    }
}
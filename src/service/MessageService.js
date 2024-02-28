const Message = require('../model/MessageModel')
const User = require('../model/UserModel')
const main = require('../index');

module.exports = {
    createMessage: (senderId, chatId, text) => {
        return new Promise(async (resolve, reject) => {
            try {

                const newMessage = await Message.create({
                    senderId: senderId,
                    text: text,
                    chatId: chatId
                })
                main.io.emit('new-message', newMessage)
                resolve({
                    code: 200,
                    message: 'Success',
                    data: newMessage
                })
            } catch (error) {
                reject(error)
            }
        })
    }, getMessageById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(id)
                const getMessage = await Message.find({ chatId: id });
                const user = await User.findById(id)
                console.log(user)
                resolve({
                    code: 200,
                    message: 'Success',
                    data: getMessage,
                    user: user
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}
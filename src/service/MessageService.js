const Message = require('../model/MessageModel')
const User = require('../model/UserModel')
const main = require('../index');
const ChatModel = require('../model/ChatModel');

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
    }, getAllMessage: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Tìm tất cả các cuộc trò chuyện mà người dùng tham gia
                const chats = await ChatModel.find({ members: userId });

                // Lấy ra danh sách các ID của các cuộc trò chuyện
                const chatIds = chats.map(chat => chat._id);

                const message = await Promise.all(chats.map(async (chat) => {
                    const mes = await Message.find({ chatId: chat._id })
                    console.log(mes)
                    return mes;
                }))

                resolve({
                    code: 200,
                    message: 'Success',
                    data: message,
                });
            } catch (error) {
                reject(error)
            }
        })
    }
}
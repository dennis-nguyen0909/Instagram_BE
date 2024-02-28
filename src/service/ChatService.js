const Chat = require("../model/ChatModel")
const main = require('../index');

module.exports = {
    createChat: async (senderId, receiverId) => {
        try {
            const existingChat = await Chat.findOne({
                members: { $all: [senderId, receiverId] }
            });

            if (existingChat) {
                return {
                    code: 200,
                    message: "Chat is already exist",
                    data: existingChat
                };
            } else {
                const newChat = await Chat.create({
                    members: [senderId, receiverId]
                });

                return {
                    code: 200,
                    message: "Create chat success!",
                    data: newChat
                };
            }
        } catch (error) {
            throw error;
        }
    },
    getUserChats: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const chat = await Chat.find({
                    members: { $in: [id] },
                });
                resolve({
                    code: 200,
                    message: "Get chat success!",
                    data: chat
                })

            } catch (error) {
                reject(error)
            }
        })
    }, findChat: (firstId, secondId) => {
        return new Promise(async (resolve, reject) => {
            try {

                const user = await Chat.findOne({ members: [firstId, secondId] });


                resolve({
                    code: 200,
                    message: "Create chat success!",
                    data: user
                })

            } catch (error) {
                reject(error)
            }
        })
    }
}
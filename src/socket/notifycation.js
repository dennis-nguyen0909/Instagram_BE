const { Server } = require('socket.io')
const User = require('../model/UserModel')
const notifycationSocket = (httpServer) => {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {

        socket.on('disconnect', () => {
            console.log('User disconnected from notifications', socket.id);
        });
        socket.on('like', ({ postId, userId, userPost }) => {
            console.log(postId, userId, userPost);
        })
    });
}
module.exports = notifycationSocket
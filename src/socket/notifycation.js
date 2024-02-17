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
        // socket.on('likePost', ({ postId, userId, userPost }) => {

        //     // Gửi thông báo đến chủ bài viết thông qua socket với postId và userId của người like
        //     io.emit('notifyOwnerPostLiked', { postId, userId, userPost });
        // });
    });
}
module.exports = notifycationSocket
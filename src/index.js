const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const UserRouter = require('../src/routes/UserRouter');
const PostRouter = require('../src/routes/PostRouter');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const cors = require('cors');
const notifycationSocket = require('../src/socket/notifycation');
const NotifyRouter = require('./routes/NotifyRouter');
const MessageRouter = require('./routes/MessageRouter')
const ChatRouter = require('./routes/ChatRouter')
// SOCKET
const http = require('http'); // Import thêm module http
const server = http.createServer(app); // Tạo thể hiện của http.Server từ app
const { Server } = require('socket.io');
const connectToDatabase = require('./db/mongodb');
const ReelRouter = require('./routes/ReelRouter');
const StoriesRouter = require('./routes/StorieRouter');
const io = new Server(server) // Gắn socket.io vào thể hiện của http.Server


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

UserRouter(app);
PostRouter(app);
NotifyRouter(app);
MessageRouter(app);
ChatRouter(app);
ReelRouter(app);
StoriesRouter(app);
connectToDatabase();

let onlineUsers = []
const addNewUser = (userName, socketId) => {
    !onlineUsers.some(user => user.userName === userName) &&
        onlineUsers.push({
            userName,
            socketId
        })

}
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user?.socketId !== socketId)
}
const getUser = (userName) => {
    return onlineUsers.find((user) => user?.userName === userName)
}
io.on('connection', (socket) => {
    socket.emit('connected', socket.id)
    socket.on('addNewUser', (userName) => {
        addNewUser(userName, socket.id)
        // io.emit('onlineUsers', onlineUsers)
        console.log("onlineUsers", onlineUsers)
    })
    socket.on('disconnect', () => {
        removeUser(socket.id)
        // console.log("onlineUsers", onlineUsers)
        // io.emit('onlineUsers', onlineUsers)
    });

    socket.on('comment', (msg) => {
        socket.emit("new-comment", msg)
    })
    socket.on('notifications', ({ sender, receiver, message }) => {
        console.log("sender, receiver, message ", sender, receiver, message)
        const receiverOnline = getUser(receiver)
        console.log(receiverOnline)
        io.to(receiverOnline?.socketId).emit("getNotifications", { sender, message })
    })

})

const { OpenAI } = require('openai')
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
});

exports.io = io
server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

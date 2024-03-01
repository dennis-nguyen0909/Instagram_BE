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
connectToDatabase();

let onlineUsers = []
io.on('connection', (socket) => {
    socket.emit('connected', socket.id)

    socket.on('addNewUser', (userId) => {
        !onlineUsers.some(user => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            })

        io.emit('onlineUsers', onlineUsers)
        console.log("onlineUsers", onlineUsers)
    })
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
        io.emit('onlineUsers', onlineUsers)
    });
    socket.on('comment', (msg) => {
        socket.emit("new-comment", msg)
    })

})
exports.io = io
server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

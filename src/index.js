const express = require('express');
const app = express();
const port = 8080;
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
// SOCKET
const http = require('http'); // Import thêm module http
const server = http.createServer(app); // Tạo thể hiện của http.Server từ app
const { Server } = require('socket.io')
const io = new Server(server) // Gắn socket.io vào thể hiện của http.Server


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

UserRouter(app);
PostRouter(app);
NotifyRouter(app);

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connect database successfully!!");
    })
    .catch((err) => {
        console.error("Connect database error!!", err);
    });

io.on('connection', (socket) => {
    console.log('okkk', socket.id)
    socket.on('like', (mes) => {
        console.log(mes)
    })
})

exports.io = io
// notifycationSocket(server)
// Start the server

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

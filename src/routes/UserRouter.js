const express = require('express')
const UserController = require('../controller/UserController');

const router = express.Router()


const UserRouter = (app) => {
    router.post('/create', UserController.create);
    router.post('/login', UserController.login);
    router.put('/update/:id', UserController.update);
    router.put('/update-birthday', UserController.updateBirthday);
    router.post('/refresh-token', UserController.refreshToken);
    router.post('/auth-mail', UserController.sendMailAuth);
    router.get('/get-detail/:id', UserController.getDetailUser);
    router.post('/log-out', UserController.logoutUser);
    router.get('/get-all-user', UserController.getAllUser);
    router.put('/follow/:id', UserController.handleFollow);
    router.put('/unfollow/:id', UserController.handleUnFollow);
    router.get('/get-noFriends/:id', UserController.getNotFriends);
    router.get('/friends/:id', UserController.getFriends);
    router.get('/get-user', UserController.getUserByUsername);

    return app.use('/api/user', router)
}

module.exports = UserRouter
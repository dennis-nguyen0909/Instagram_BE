const mongoose = require("mongoose")

const storiesView = new mongoose.Schema({
    storyID: {
        type: String,
        ref: 'User',
        require: true
    },
    userId: {
        type: String,
        ref: 'Stories',
        require: true
    },
    userView: {
        type: String,
        ref: 'User',
        type: String
    }

})

const ViewStories = mongoose.model('ViewStories', storiesView)
module.exports = ViewStories
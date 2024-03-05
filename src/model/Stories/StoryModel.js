const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const storySchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "User",
        require: true
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        require: true

    },
    mediaUrl: {
        type: String,
        require: true
    },
    caption: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    viewUsers: [{
        type: String,
        ref: 'User'
    }],
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            postedBy: {
                type: ObjectId,
                ref: "User",
            },
        },
    ],

})

const Stories = mongoose.model('Stories', storySchema)
module.exports = Stories
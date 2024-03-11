const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const ReelSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        require: true
    },
    videoUrl: {
        type: String,
        require: true
    },
    caption: {
        type: String,
        require: true
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
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
    createdAt: {
        type: Date,
        default: Date.now
    }

})
const Reel = mongoose.model('Reel', ReelSchema)
module.exports = Reel
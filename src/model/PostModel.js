const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: "User",
            required: true,
        },
        desc: {
            type: String,
            maxlength: 500,
        },
        images: {
            type: [String], // Nhiều hình ảnh
        },
        likes: [{ type: ObjectId, ref: "User" }],
        comments: {
            text: String,
            created: { type: Date, default: Date.Now },
            postedBy: {
                type: ObjectId,
                ref: 'User'
            }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);

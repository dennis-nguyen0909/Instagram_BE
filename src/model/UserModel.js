const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        userName: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        isAdmin: { type: Boolean, default: false, require: true },
        phone: { type: Number, require: true },
        birthday: { type: Date, require: true },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        sex: { type: String }
        ,
        avatar: { type: String },
        coverPicture: {
            type: String,
            default: "",
        },
        desc: {
            type: String,
            max: 50,
        },
        address: { type: String },
        city: { type: String },
        districts: { type: String },
        ward: { type: String },
        access_token: { type: String, require: true },
        refresh_token: { type: String, require: true },
        posts: [{ type: String, ref: "Post" }],
        reels: [{ type: String, ref: "Reel" }],
    }, {
    timestamps: true
});
const User = mongoose.model("User", userSchema);
module.exports = User;
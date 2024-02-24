const Post = require('../model/PostModel')
const User = require('../model/UserModel')
require('dotenv').config()
const { verifyToken } = require('./JwtService');
const main = require('../index');
const { Subject, Observer } = require('../designPartern/observer');

module.exports = {
    create: (id, desc, images) => {
        return new Promise(async (resolve, reject) => {
            try {
                const checkIdUser = await User.findOne({
                    _id: id
                })
                if (checkIdUser === null) {
                    resolve({
                        EM: 'User not is exist!!',
                        EC: 1,
                    })
                }
                const createPost = await Post.create({ userId: id, desc: desc, images: images })
                checkIdUser.posts.push(createPost._id);
                await checkIdUser.save();
                if (createPost) {
                    resolve({
                        EM: 'OK',
                        EC: 0,
                        DT: createPost
                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    delete: async (idPost, token) => {
        return new Promise(async (resolve, reject) => {
            try {
                const checkPostExist = await Post.findOne({ _id: idPost });

                // Thêm từ khóa 'await' để đợi cho hàm verifyToken hoàn thành
                const user = await verifyToken(token);

                if (user !== checkPostExist.userId) {
                    resolve({
                        EM: 'Post is deleted by user post!',
                        EC: 1,
                    })
                }
                if (checkPostExist === null) {
                    resolve({
                        EM: 'Post not exist!',
                        EC: 1,
                    })
                }

                const deletePost = await Post.findByIdAndDelete(idPost);
                if (deletePost) {
                    resolve({
                        EM: "Delete Successfully!",
                        EC: 0,
                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    },
    getDetailPost: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const post = await Post.findOne({
                    _id: id
                })

                if (post === null) {
                    resolve({
                        message: "Post is not defined!!",
                        status: "Error"
                    })
                }
                resolve({
                    status: 'Ok',
                    message: " Success!!",
                    data: post
                })
            } catch (error) {
                reject(error)
            }
        })
    },
    update: (id, data, token) => {
        return new Promise(async (resolve, reject) => {
            try {

                const checkPostExist = await Post.findOne({ _id: id });
                if (checkPostExist === null) {
                    resolve({
                        EM: 'POST NOT exist!!',
                        EC: 1,
                    });
                    return;
                }

                // Thêm từ khóa 'await' để đợi cho hàm verifyToken hoàn thành
                const user = await verifyToken(token);
                if (user !== checkPostExist.userId) {
                    resolve({
                        EM: 'Kh có quyền sửa',
                        EC: 1,
                    });
                    return;
                }

                // Cập nhật thông tin bài viết
                const updatePost = await Post.findByIdAndUpdate(id, data, { new: true });

                if (updatePost) {
                    resolve({
                        EM: "Update success!",
                        EC: 0,
                        updatePost
                    });
                } else {
                    resolve({
                        EM: "Update failed"
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    getAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const getAllPost = await Post.find().sort({ createdAt: -1 })
                    .populate('likes', 'userName avatar')
                    .populate('comments.postedBy', 'userName email avatar');

                const postsWithUserInfo = await Promise.all(getAllPost.map(async (post) => {
                    // Lấy thông tin người dùng từ userId của bài post
                    const user = await User.findById(post.userId);
                    if (!user) {
                        return null; // Nếu không tìm thấy người dùng, trả về null
                    }

                    // Kết hợp thông tin người dùng với bài post
                    return {
                        ...post.toObject(), // Chuyển đổi post thành object plain
                        user: user.toObject() // Chuyển đổi user thành object plain
                    };
                }));
                const filteredPosts = postsWithUserInfo.filter(post => post !== null);
                resolve({
                    status: 'Ok',
                    message: " Success!!",
                    posts: filteredPosts,

                })
            } catch (error) {
                reject(error)
            }
        })
    }, like: (postId, userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const post = await Post.findByIdAndUpdate(postId, {
                    $addToSet: { likes: userId }
                }, {
                    new: true
                })
                const posts = await Post.find().sort({ createdAt: -1 }).populate('likes', 'userName name avatar');
                const postsWithUserInfo = await Promise.all(posts.map(async (pos) => {
                    // Lấy thông tin người dùng từ userId của bài post
                    const user = await User.findById(pos.userId);
                    if (!user) {
                        return null; // Nếu không tìm thấy người dùng, trả về null
                    }

                    // Kết hợp thông tin người dùng với bài post
                    return {
                        ...pos.toObject(), // Chuyển đổi post thành object plain
                        user: user.toObject() // Chuyển đổi user thành object plain
                    };
                }));
                const filteredPosts = postsWithUserInfo.filter(pos => pos !== null);
                main.io.emit('like', filteredPosts)
                resolve({
                    status: 'Ok',
                    message: "The post has been liked",
                    data: post,
                    filteredPosts

                });


            } catch (error) {
                reject(error);
            }
        });
    },
    unLike: (postId, userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const post = await Post.findByIdAndUpdate(postId, {
                    $pull: { likes: userId }
                }, {
                    new: true
                })
                const posts = await Post.find().sort({ createdAt: -1 }).populate('likes', 'userName name avatar');
                const filterPost = await Promise.all(posts.map(async (post) => {
                    const user = await User.findById(post.userId);
                    if (user == null) {
                        return null
                    }
                    return {
                        ...post.toObject(),
                        user: user.toObject()
                    }
                }))
                const filteredPosts = filterPost.filter(pos => pos !== null);

                main.io.emit('unlike', filteredPosts)
                resolve({
                    status: 'Ok',
                    message: "The post has been disliked",
                    data: post,
                    filteredPosts
                });
            } catch (error) {
                reject(error);
            }
        });
    }, likePost: (postId, userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const post = await Post.findById(postId);

                if (!post.likes.includes(userId)) {
                    const post1 = await Post.findByIdAndUpdate(postId, {
                        $addToSet: { likes: userId }
                    }, {
                        new: true
                    })
                    const posts = await Post.find().sort({ createdAt: -1 }).populate('likes', 'userName name avatar');

                    const filterPost = await Promise.all(posts.map(async (post) => {
                        const user = await User.findById(post.userId);
                        if (user == null) {
                            return null
                        }
                        return {
                            ...post.toObject(),
                            user: user.toObject()
                        }
                    }))
                    const filteredPosts = filterPost.filter(pos => pos !== null);

                    main.io.emit('unlike', filteredPosts)
                    resolve({
                        EM: 'The post has been liked',
                        data: post1
                    })
                } else {
                    const post1 = await Post.findByIdAndUpdate(postId, {
                        $pull: { likes: userId }
                    }, {
                        new: true
                    })
                    const posts = await Post.find().sort({ createdAt: -1 }).populate('likes', 'userName name avatar');
                    const filterPost = await Promise.all(posts.map(async (post) => {
                        const user = await User.findById(post.userId);
                        if (user == null) {
                            return null
                        }
                        return {
                            ...post.toObject(),
                            user: user.toObject()
                        }
                    }))
                    const filteredPosts = filterPost.filter(pos => pos !== null);

                    main.io.emit('like', filteredPosts)

                    resolve({
                        EM: 'The post has been disliked',
                        data: post1
                    })
                }
            } catch (error) {
                reject(error)
            }
        })
    }, commentsPost: (postId, userId, comment) => {
        return new Promise(async (resolve, reject) => {
            try {

                const postComment = await Post.findByIdAndUpdate(postId, {
                    $push: { comments: { text: comment, postedBy: userId } }
                }, { new: true })
                const post = await Post.findById(postId).populate('comments.postedBy', 'userName email avatar');

                main.io.emit('new-comment2', post.comments)
                resolve({
                    code: 200,
                    message: 'Update comments successfully!',
                    posts: post,

                })
            } catch (error) {
                reject(error)
            }
        })
    },
    getPostByUser: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(userId);
                const posts = await Post.find({ userId: userId }); // Tìm các bài đăng có userId trùng khớp
                console.log(posts);
                resolve({
                    code: 200,
                    message: 'Find ok!!',
                    data: posts
                });
            } catch (error) {
                reject(error);
            }
        })
    }

}
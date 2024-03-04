const Reel = require("../model/ReelModel")


module.exports = {
    handleCreateReel: (userId, videoUrl, caption) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(userId, videoUrl, caption)

                const reel = await Reel.create({
                    userId, videoUrl, caption
                });


                resolve({
                    EC: 0,
                    EM: 'Success',
                    data: reel
                })

            } catch (error) {
                reject(error)

            }
        })
    }, handleDeleteReel: (id) => {
        return new Promise(async (resolve, reject) => {
            try {


                const deleted = await Reel.findByIdAndDelete(id);

                if (!deleted) {
                    resolve({
                        code: 404,
                        message: 'Not found !!!',
                    })
                }
                resolve({
                    code: 200,
                    message: 'Delete !!!',
                    data: deleted
                })

            } catch (error) {
                reject(error)

            }
        })
    }, handleGetDetail: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const findReel = await Reel.findById(id);
                if (!findReel) {
                    resolve({
                        code: 404,
                        message: 'Not found !!!',
                    })
                }
                resolve({
                    code: 200,
                    message: 'Find success !!!',
                    data: findReel
                })

            } catch (error) {
                reject(error)

            }
        })
    }, handleUpdateReel: (id, userId, videoUrl, caption) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updated = await Reel.findByIdAndUpdate(id, { caption: caption }, { new: true });
                console.log(id, caption);
                if (!updated) {
                    resolve({
                        code: 404,
                        message: 'Not found !!!',
                    });
                }
                console.log(updated);
                resolve({
                    code: 200,
                    message: 'Update success !!!',
                    data: updated
                });
            } catch (error) {
                reject(error);
            }
        });

    }, handleGetAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const getAll = await Reel.find().sort({ createdAt: -1 });
                if (!getAll) {
                    resolve({
                        code: 404,
                        message: 'Not found !!!',
                    })
                }
                resolve({
                    code: 200,
                    message: 'Get All !!!',
                    data: getAll
                })

            } catch (error) {
                reject(error)

            }
        })
    }
}
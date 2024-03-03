const cloudinary = require('cloudinary');

const dotenv = require('dotenv')
dotenv.config()

cloudinary.config({
    cloud_name: 'dxtz2g7ga',
    api_key: '953156321132996',
    api_secret: 'As23z_TAML8DqymuQA5Mw-KIk14'
});
exports.uploads = (file, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader
            .upload(file, { folder: folder })
            .then(result => resolve({
                url: result.url,
                id: result.public_id
            }));
    })
}
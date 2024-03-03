const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const fileValidation = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb({ message: "Unsupported file format!!" }, false)
    }
}

const upload = multer({
    storage: storage,
    limits: { fieldSize: 1024 * 1024 },
    fileFilter: fileValidation
})
module.exports = upload
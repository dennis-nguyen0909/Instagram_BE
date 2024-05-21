const cloudinary = require("cloudinary");

const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.uploads = (file, folder) => {
  return new Promise(async (resolve, reject) => {
    await cloudinary.v2.uploader
      .upload(file, { folder: folder })
      .then((result) =>
        resolve({
          url: result.url,
          id: result.public_id,
        })
      );
  });
};
exports.uploadVideo = (file, folder) => {
  return new Promise(async (resolve, reject) => {
    await cloudinary.v2.uploader.upload(
      file,
      { folder: folder, resource_type: "video" }, // Đã thêm resource_type vào đây
      (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log(result);
          resolve({
            url: result.url,
            id: result.public_id,
          });
        }
      }
    );
  });
};
